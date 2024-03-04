const parser = require('../parser/parser')
const metaDataRaw = '---\ndate: 2022-05-23\ntitle: GET2 Test Results\ntags: thoughts\n---\n\n'

function executeTest (description, fn, expected) {
  const result = fn()

  if (JSON.stringify(result) === JSON.stringify(expected)) {
    console.log(`\u2714 ${description}`)
  } else {
    console.log(`\u274c ${description}\nExpected: ${JSON.stringify(expected)}, \nActual: ${JSON.stringify(result)}`)
  }
}

function that (description, callback, expected) {
  executeTest(description, callback, expected)
}

function xthat (description, callback, expected) {
  console.log(`SKIPPED: ${description}`)
}

function getTree (input) {
  return () => { return parser(`${metaDataRaw}${input}`).tree }
}

module.exports = {
  that, xthat, getTree
}
