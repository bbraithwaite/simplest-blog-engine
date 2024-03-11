const test = require('./../test')
const testThat = test.that

testThat(
  'images with an alt text are parsed',
  test.parseMarkUp('An example of {http://example.net/img/logo.jpg|alt text}'),
  [
    '<p>An example of <img src="http://example.net/img/logo.jpg" alt="alt text"></p>'
  ]
)

testThat(
  'images with dimensions are parsed',
  test.parseMarkUp('An example of {http://example.net/img/logo.jpg|alt text|200|100}'),
  [
    '<p>An example of <img src="http://example.net/img/logo.jpg" alt="alt text" width="200" height="100"></p>'
  ]
)
