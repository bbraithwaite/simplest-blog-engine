const parser = require('../lib/parse/content')
const metaDataRaw = '---\ndate: 2022-05-23\ntitle: Simplest Blog\n---\n\n'

/**
 * parseMarkUp - Parses the simplest blog markup in HTML format.
 * @param {string} input - The simplest blog markup.
 * @returns {array} An array of the parsed lines from sb markup to HTML.
 */
const parseMarkUp = (input) => {
  return () => { return parser(`${metaDataRaw}${input}`).content }
}

/**
 * that - Runs a test and compares the result against and expected outcome.
 * @param {string} description - The description of the test.
 * @param {function} callback - The test function to be executed.
 * @param {object} expected - The expected result.
 */
const that = (description, callback, expected) => {
  const result = callback()

  if (JSON.stringify(result) === JSON.stringify(expected)) {
    console.log(`\u2714 ${description}`)
  } else {
    console.log(`\u274c ${description}\nExpected: ${JSON.stringify(expected)}, \nActual: ${JSON.stringify(result)}`)
  }
}

module.exports = {
  parseMarkUp,
  that
}
