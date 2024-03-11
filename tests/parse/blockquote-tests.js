const test = require('./../test')
const testThat = test.that

testThat(
  'blockquotes tags are parsed',
  test.getTree('> This is a very important quote.'),
  [
    '<blockquote>This is a very important quote.</blockquote>'
  ]
)

testThat(
  'blockquotes can have a new line character escape',
  test.getTree('> This is some text.\\n\\nThis is some more text.'),
  [
    '<blockquote>This is some text.<br><br>This is some more text.</blockquote>'
  ]
)
