const fs = require('fs')
const path = require('path')
const compile = require('./compile.js')
const generatorFolder = path.resolve('')
const outputFolder = path.resolve('_output')
const styleCssFile = `${generatorFolder}/style.css`

console.log(`Watching for file changes on ${styleCssFile}`)

fs.watch(styleCssFile, (curr, prev) => {
  console.log(`${styleCssFile} file Changed`)
  fs.copyFile(styleCssFile, `${outputFolder}/style.css`, (err) => {
    if (err) throw err
  })
})

fs.watch(`${generatorFolder}/posts`, (curr, prev) => {
  console.log(`${prev} modified...`)
  compile()
})
