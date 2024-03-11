const regex = require('./regex')

function _parseTableRow (value, tag) {
  let initialValue = '<tr>\n'
  initialValue = value.split('|').reduce((previousValue, currentValue) => previousValue + `<${tag}>${currentValue.trim()}</${tag}>`, initialValue)
  return initialValue + '\n</tr>'
}

function _parseTag (input, re, tag, escapeChar) {
  let match
  let ret = input

  while ((match = re.exec(input)) != null) {
    if (tag === 'hr') {
      ret = '<hr>'
    } else if (tag === 'a') {
      ret = ret.replace(match[0], `<a href="${match[2]}" title="${match[3]}">${match[1]}</a>`)
    } else if (tag === 'img') {
      if (match[3]) {
        ret = ret.replace(match[0], `<img src="${match[1]}" alt="${match[2]}" width="${match[3]}" height="${match[4]}">`)
      } else {
        ret = ret.replace(match[0], `<img src="${match[1]}" alt="${match[2]}">`)
      }
    } else if (tag === 'td') {
      ret = ret.replace(match[0], _parseTableRow(match[1], 'td'))
    } else if (tag === 'th') {
      ret = ret.replace(match[0], _parseTableRow(match[1], 'th'))
    } else if (escapeChar) {
      ret = ret.replace(match[0], `${tag}`)
    } else if (tag === 'u') {
      ret = ret.replace(match[0], `<span class="underline">${match[1]}</span>`)
    } else {
      ret = ret.replace(match[0], `<${tag}>${match[1]}</${tag}>`)
    }
  }

  if (!ret) {
    return input
  }

  return ret
}

module.exports = (line, tree) => {
  if (line.trim().length === 0) return

  const startsWithTag = /^(h[0-9]|>|---|-\s|[0-9]+\.\s|tr\s|<[a-z]|<\/[a-z])|th\s/

  let ret = line

  if (!startsWithTag.test(line)) {
    ret = `<p>${line}</p>`
  }

  ret = _parseTag(ret, regex.boldEscape, '&#42;', true)
  ret = _parseTag(ret, regex.italicEscape, '&#8208;', true)
  ret = _parseTag(ret, regex.underlineEscape, '&#95;', true)
  ret = _parseTag(ret, regex.newLineEscape, '<br>', true)
  ret = _parseTag(ret, regex.tableHeader, 'th')
  ret = _parseTag(ret, regex.table, 'td')
  ret = _parseTag(ret, regex.h1, 'h1')
  ret = _parseTag(ret, regex.h2, 'h2')
  ret = _parseTag(ret, regex.h3, 'h3')
  ret = _parseTag(ret, regex.h4, 'h4')
  ret = _parseTag(ret, regex.h5, 'h5')
  ret = _parseTag(ret, regex.h6, 'h6')
  ret = _parseTag(ret, regex.bold, 'strong')
  ret = _parseTag(ret, regex.italic, 'em')
  ret = _parseTag(ret, regex.underline, 'u')
  ret = _parseTag(ret, regex.blockquote, 'blockquote')
  ret = _parseTag(ret, regex.horizontalRule, 'hr')
  ret = _parseTag(ret, regex.anchor, 'a')
  ret = _parseTag(ret, regex.image, 'img')
  ret = _parseTag(ret, regex.imageDimensions, 'img')
  ret = _parseTag(ret, regex.unorderedList, 'li')
  ret = _parseTag(ret, regex.orderedList, 'li')

  tree.push(ret)
}
