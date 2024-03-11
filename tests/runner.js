const fs = require('fs')
const files = fs.readdirSync(`${__dirname}/parse`, 'utf8')
const matchedFiles = /(.*-tests).js/

// excecutes files in the /tests/ folder that as suffixed with '-tests.js'
files.forEach((file) => {
  const m = matchedFiles.exec(file)
  if (m) {
    require(`./parse/${m[1]}`)
  }
})
