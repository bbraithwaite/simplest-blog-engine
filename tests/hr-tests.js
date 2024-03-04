const test = require('./test')
const testThat = test.that

testThat(
  'horizontal rules are parsed',
  test.getTree('Foo.\n---\nBar.'),
  [
    '<p>Foo.</p>',
    '<hr>',
    '<p>Bar.</p>'
  ]
)
