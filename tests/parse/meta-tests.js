const test = require('./../test')
const testThat = test.that
const parser = require('./../../lib/parse/parser')

const metaDataRaw = '---\ndate: 2022-05-23\ntitle: The Simplest Blog\ntags: thoughts\n---\n\n'
const metaDataParsed = {
  date: '2022-05-23',
  title: 'The Simplest Blog',
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
