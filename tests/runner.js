const fs = require('fs')
const path = require('path')
const files = fs.readdirSync(path.join(__dirname, '/parse'), 'utf8')
const matchedFiles = /(.*-tests).js/

// excecutes files in the /tests/ folder that as suffixed with '-tests.js'
console.log('Parse Tests:')
files.forEach((file) => {
  const m = matchedFiles.exec(file)
  if (m) {
    require(`./parse/${m[1]}`)
  }
})
