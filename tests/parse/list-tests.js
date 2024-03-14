const test = require('./../test')
const testThat = test.that

testThat(
  'unordered lists are parsed',
  test.parseMarkUp('Here is a list:\n- one thing\n- two\n- three\n\nThe end.'),
  [
    '<p>Here is a list:</p>',
    '<ul>\n<li>one thing</li>\n<li>two</li>\n<li>three</li>\n</ul>',
    '<p>The end.</p>'
  ].join('')
)

testThat(
  'unordered lists are parsed when it\'s the final element',
  test.parseMarkUp('Here is a list:\n- one thing\n- two\n- three'),
  [
    '<p>Here is a list:</p>',
    '<ul>\n<li>one thing</li>\n<li>two</li>\n<li>three</li>\n</ul>'
  ].join('')
)

testThat(
  'ordered lists are parsed',
  test.parseMarkUp('Here is a list:\n1. one thing\n2. two\n3. three\n10. ten'),
  [
    '<p>Here is a list:</p>',
    '<ol>\n<li>one thing</li>\n<li>two</li>\n<li>three</li>\n<li>ten</li>\n</ol>'
  ].join('')
)

testThat(
  'ordered lists are parsed when it\'s the final element',
  test.parseMarkUp('Here is a list:\n1. one thing\n2. two\n3. three\n\nThe end.'),
  [
    '<p>Here is a list:</p>',
    '<ol>\n<li>one thing</li>\n<li>two</li>\n<li>three</li>\n</ol>',
    '<p>The end.</p>'
  ].join('')
)
