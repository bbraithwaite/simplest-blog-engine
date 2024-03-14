const test = require('./../test')
const testThat = test.that

testThat(
  'single line paragraphs are parsed',
  test.parseMarkUp('This is some text.'),
  '<p>This is some text.</p>'
)

testThat(
  'multile line paragraphs are parsed',
  test.parseMarkUp('This is some text.\n\nThis is some more text.'),
  '<p>This is some text.</p><p>This is some more text.</p>'
)
