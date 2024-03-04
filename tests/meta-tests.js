const test = require('./test')
const testThat = test.that
const parser = require('../parser/parser')

const metaDataRaw = '---\ndate: 2022-05-23\ntitle: GET2 Test Results\ntags: thoughts\n---\n\n'
const metaDataParsed = {
  date: '2022-05-23',
  title: 'GET2 Test Results',
  tags: 'thoughts',
  unixDate: 1653264000,
  displayDate: '23 May 2022',
  content: 'This is some more text.',
  contentStart: 5
}

testThat(
  'meta data is parsed',
  () => { return parser(`${metaDataRaw}This is some more text.`) },
  {
    meta: metaDataParsed,
    tree: ['<p>This is some more text.</p>']
  }
)
