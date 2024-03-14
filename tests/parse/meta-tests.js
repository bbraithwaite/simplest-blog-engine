const test = require('./../test')
const testThat = test.that
const metaData = require('./../../lib/parse/meta-data')

const metaDataRaw = '---\ndate: 2022-05-23\ntitle: The Simplest Blog\nslug: this-page\n---\n\n'

testThat(
  'meta data is parsed',
  () => { return metaData(`${metaDataRaw}This is some more text.`, 'http://localhost') },
  {
    date: '2022-05-23',
    title: 'The Simplest Blog',
    slug: 'this-page',
    unixDate: 1653264000,
    displayDate: '23 May 2022',
    content: 'This is some more text.',
    contentStart: 5,
    url: 'http://localhost/this-page.html',
    fileName: 'this-page.html'
  }
)
