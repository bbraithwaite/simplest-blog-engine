const test = require('./../test')
const testThat = test.that
const maxHeadings = 6

// test the headings from h1...h6
for (let i = 1; i <= maxHeadings; i++) {
  testThat(
    `h${i} should is parsed`,
    test.getTree(`h${i} Heading ${i}`),
    [
      `<h${i}>Heading ${i}</h${i}>`
    ]
  )
}
