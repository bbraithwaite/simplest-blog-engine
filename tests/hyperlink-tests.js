const test = require('./test')
const testThat = test.that

testThat(
  'hyperlinks with a title are parsed',
  test.getTree('An example of [This link|http://example.net|title]. Here is a second [This link 2|http://example2.net|title 2]'),
  [
    '<p>An example of <a href="http://example.net" title="title">This link</a>. Here is a second <a href="http://example2.net" title="title 2">This link 2</a></p>'
  ]
)
