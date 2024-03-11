const fs = require('fs')
const blogConfig = JSON.parse(fs.readFileSync('blog.json', 'utf-8'))

function getSitePort (isPublishMode) {
  return (isPublishMode) ? blogConfig.publishedPort : blogConfig.devPort
}

function getSiteUrl (isPublishMode) {
  return (isPublishMode) ? blogConfig.publishedUrl : blogConfig.devUrl
}

module.exports = {
  getSitePort,
  getSiteUrl
}
