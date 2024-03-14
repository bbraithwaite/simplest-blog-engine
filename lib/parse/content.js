const metaData = require('./meta-data')
const parseLine = require('./line')

const UNORDERED_LIST = 1
const ORDERED_LIST = 2
const TABLE = 3

module.exports = (string, blogRootUrl) => {
  const meta = metaData(string, blogRootUrl)
  const lines = string.split('\n')
  const tree = []

  let listRoot = []
  let openedList = false
  let listType = 0
  let previousType = 0
  let startOfContent = false

  function _getListElementType (item) {
    if (item && (/^-\s(.*)/.test(item))) {
      return UNORDERED_LIST
    }

    if (item && (/^[0-9]+\.\s(.*)/.test(item))) {
      return ORDERED_LIST
    }

    if (item && /^tr\s(.*)|^th\s(.*)/.test(item)) {
      return TABLE
    }

    return 0
  }

  function _openList () {
    openedList = true
    previousType = listType
    switch (listType) {
      case UNORDERED_LIST:
        listRoot.push('<ul>')
        break
      case ORDERED_LIST:
        listRoot.push('<ol>')
        break
      case TABLE:
        listRoot.push('<table>')
        break
    }
  }

  function _closeList () {
    switch (previousType) {
      case UNORDERED_LIST:
        listRoot.push('</ul>')
        break
      case ORDERED_LIST:
        listRoot.push('</ol>')
        break
      case TABLE:
        listRoot.push('</table>')
        break
    }

    tree.push(listRoot.join('\n'))
    openedList = false
    listRoot = []
    previousType = 0
  }

  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === '---' && i > 0 && !startOfContent) {
      startOfContent = true
      i += 1
    }

    if (!startOfContent || typeof lines[i] === 'undefined') continue

    listType = _getListElementType(lines[i])

    // start of a list (<ul> or <li>)
    if (listType && !openedList) {
      _openList()
    }

    // start of a list (</ul> or </li>)
    if (!listType && openedList) {
      _closeList()
    }

    parseLine(lines[i].trim(), (openedList) ? listRoot : tree)
  }

  // end of a list but no more elements
  if (openedList) {
    _closeList()
  }

  meta.content = tree.join('')

  return meta
}
