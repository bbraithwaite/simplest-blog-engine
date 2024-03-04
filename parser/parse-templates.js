const fs = require('fs')
const metaData = require('../parser/meta-data')
const parser = require('../parser/parser')
const blogConfig = JSON.parse(fs.readFileSync('blog.json', 'utf-8'))

function parseBlogPage (globalSiteTemplate, post, blogTemplate) {
  const template = this.parsePage(globalSiteTemplate, blogTemplate)
  const parsedPost = parser(post)

  const meta = metaData(post.split('\n'))
  let parsedHtml = template

  for (const key in meta) {
    if (key === 'content') continue
    parsedHtml = parsedHtml.replaceAll(`{{${key}}}`, meta[key])
  }

  parsedHtml = parsedHtml.replaceAll('{{content}}', parsedPost.tree.join(''))

  return parsedHtml
}

function parsePage (indexHtmlTemplate, indexContent) {
  const meta = metaData(indexContent.split('\n'))

  let parsedHtml = indexHtmlTemplate

  for (const key in meta) {
    parsedHtml = parsedHtml.replaceAll(`{{${key}}}`, meta[key])
  }

  parsedHtml = parsedHtml.replaceAll('{{url}}', blogConfig.devUrl)

  return parsedHtml
}

function parseBlogIndex (globalSiteTemplate, blogIndexTemplate, allPostsMetaData) {
  const articleLinks = []
  let template = this.parsePage(globalSiteTemplate, blogIndexTemplate)

  // sort the links by publish date
  allPostsMetaData.sort((a, b) => b.unixDate - a.unixDate)

  articleLinks.push('<ul>')

  for (let i = 0; i < allPostsMetaData.length; i++) {
    articleLinks.push(`\n<li><a href="${allPostsMetaData[i].url}">${allPostsMetaData[i].title}</a></li>`)
  }

  articleLinks.push('\n</ul>')

  template = template.replaceAll('{{articles}}', articleLinks.join(''))

  return template
}

module.exports = {
  parseBlogIndex,
  parseBlogPage,
  parsePage
}
