const http = require('http')
const fs = require('fs')
const path = require('path')
const outputFolder = path.resolve('_output')
const blogConfig = JSON.parse(fs.readFileSync('blog.json', 'utf-8'))

http.createServer(function (request, response) {
  let filePath = '.' + request.url

  if (filePath === './') {
    filePath = './index.html'
  }

  const extname = path.extname(filePath)
  let contentType = 'text/html'

  switch (extname) {
    case '.js':
      contentType = 'text/javascript'
      break
    case '.css':
      contentType = 'text/css'
      break
    case '.png':
      contentType = 'image/png'
      break
    case '.jpg':
      contentType = 'image/jpg'
      break
  }

  filePath = path.resolve(outputFolder, filePath)

  try {
    // if is a directory search for index file matching the extension
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) filePath += '/index.html'

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code === 'ENOENT') {
          fs.readFile(path.resolve(outputFolder, './404.html'), function (error, content) {
            if (error) console.log(error)
            response.writeHead(404, { 'Content-Type': contentType })
            response.end(content, 'utf-8')
          })
        } else {
          response.writeHead(500)
          response.end(`Sorry, check with the site admin for error: ${error.code} ..\n`)
          response.end()
        }
      } else {
        response.writeHead(200, { 'Content-Type': contentType })
        response.end(content, 'utf-8')
      }
    })
  } catch (e) {
    console.log(e)
  }
}).listen(blogConfig.devPort)

console.log(`Server running at http://localhost:${blogConfig.devPort}`)
