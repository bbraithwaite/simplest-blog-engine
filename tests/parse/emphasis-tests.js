const test = require('./../test')
const testThat = test.that

testThat(
  'starting bold tags are parsed',
  test.parseMarkUp('**bold tags** are converted, **more than 2 times!**.'),
  '<p><strong>bold tags</strong> are converted, <strong>more than 2 times!</strong>.</p>'
)

testThat(
  'bold tags are parsed',
  test.parseMarkUp('In this snippet **bold tags** are converted, **more than 2 times!**.'),
  '<p>In this snippet <strong>bold tags</strong> are converted, <strong>more than 2 times!</strong>.</p>'
)

testThat(
  'escaped bold tags are parsed',
  test.parseMarkUp('In this snippet **bold \\*tags** are converted, **more than 2 times!**.'),
  '<p>In this snippet <strong>bold &#42;tags</strong> are converted, <strong>more than 2 times!</strong>.</p>'
)

testThat(
  'italic tags are parsed',
  test.parseMarkUp('--italic tags-- are converted, --more than 2 times--.'),
  '<p><em>italic tags</em> are converted, <em>more than 2 times</em>.</p>'
)

testThat(
  'italic tags are parsed',
  test.parseMarkUp('In this snippet --italics-- are converted, --more than once--.'),
  '<p>In this snippet <em>italics</em> are converted, <em>more than once</em>.</p>'
)

testThat(
  'escaped italic tags are parsed',
  test.parseMarkUp('In this snippet --ital\\-ics-- are converted, --more than once--.'),
  '<p>In this snippet <em>ital&#8208;ics</em> are converted, <em>more than once</em>.</p>'
)

testThat(
  'nested emphasis tags are parsed',
  test.parseMarkUp('In this snippet --**italics**-- are converted, **--more than once--**.'),
  '<p>In this snippet <em><strong>italics</strong></em> are converted, <strong><em>more than once</em></strong>.</p>'
)

testThat(
  'underline tags are parased',
  test.parseMarkUp('__underline tags__ are converted, __more than 2 times!__.'),
  '<p><span class="underline">underline tags</span> are converted, <span class="underline">more than 2 times!</span>.</p>'
)

testThat(
  'escaped underline tags are not parased',
  test.parseMarkUp('\\_\\_underline tags\\_\\_ are not converted.'),
  '<p>&#95;&#95;underline tags&#95;&#95; are not converted.</p>'
)
