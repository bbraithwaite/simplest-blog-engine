const test = require('./../test')
const testThat = test.that

testThat(
  'table row with one item is parsed',
  test.parseMarkUp('tr This is a cell.'),
  [
    '<table>\n<tr>\n<td>This is a cell.</td>\n</tr>\n</table>'
  ]
)

testThat(
  'table row with multiple columns is parsed',
  test.parseMarkUp('tr This is a cell. | And this is another cell.'),
  [
    '<table>\n<tr>\n<td>This is a cell.</td><td>And this is another cell.</td>\n</tr>\n</table>'
  ]
)

testThat(
  'table with multiple rows is parsed',
  test.parseMarkUp('tr This is a cell.\ntr This is a cell on row 2.'),
  [
    '<table>\n<tr>\n<td>This is a cell.</td>\n</tr>\n<tr>\n<td>This is a cell on row 2.</td>\n</tr>\n</table>'
  ]
)

testThat(
  'table with a header row is parsed',
  test.parseMarkUp('th This is a header cell.\ntr This is a cell on row 2.'),
  [
    '<table>\n<tr>\n<th>This is a header cell.</th>\n</tr>\n<tr>\n<td>This is a cell on row 2.</td>\n</tr>\n</table>'
  ]
)
