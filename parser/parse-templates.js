const fs = require('fs')
const metaData = require('../parser/meta-data')
const parser = require('../parser/parser')
const blogConfig = require('../generator/blog-config')

function _getLatestArticles(allPostsMetaData) {
  if (!allPostsMetaData) return []
  return _createHtmlLinks(allPostsMetaData.slice(0, 3))
}

function _getPopularArticles(allPostsMetaData) {
  if (!allPostsMetaData) return []
  const popular = allPostsMetaData.filter((a) => { return a.popular })
  return _createHtmlLinks(popular)
}

function _createHtmlLinks(allPostsMetaData) {
    const articleLinks = []
    articleLinks.push('<ul>')

    for (let i = 0; i < allPostsMetaData.length; i++) {
      articleLinks.push(`\n<li><a href="${allPostsMetaData[i].url}">${allPostsMetaData[i].title}</a></li>`)
    }

    articleLinks.push('\n</ul>')

    return articleLinks.join('')
}

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

function parsePage (indexHtmlTemplate, indexContent, allPostsMetaData, publish) {
  const meta = metaData(indexContent.split('\n'))

  let parsedHtml = indexHtmlTemplate

  for (const key in meta) {
    parsedHtml = parsedHtml.replaceAll(`{{${key}}}`, meta[key])
  }

  parsedHtml = parsedHtml.replaceAll('{{newestArticles}}', _getLatestArticles(allPostsMetaData))
  parsedHtml = parsedHtml.replaceAll('{{popularArticles}}', _getPopularArticles(allPostsMetaData))
  parsedHtml = parsedHtml.replaceAll('{{url}}', blogConfig.getSiteUrl(publish))
  
  return parsedHtml
}

function parseBlogIndex (globalSiteTemplate, blogIndexTemplate, allPostsMetaData) {
  const articleLinks = _createHtmlLinks(allPostsMetaData)
  let template = this.parsePage(globalSiteTemplate, blogIndexTemplate)
  template = template.replaceAll('{{articles}}', articleLinks)
  return template
}

module.exports = {
  parseBlogIndex,
  parseBlogPage,
  parsePage
}
