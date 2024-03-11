const metaData = require('../parser/meta-data')
const parser = require('../parser/parser')
const pageParser = require('../parser/parse-page')

function parseBlogPage (globalSiteTemplate, post, blogTemplate, blogPosts, url) {
  const meta = metaData(post.split('\n'))
  meta.content = parser(post).tree.join('')

  let template = pageParser(meta, globalSiteTemplate, blogTemplate, blogPosts, url)

  for (const key in meta) {
    if (key === 'content') continue
    template = template.replaceAll(`{{${key}}}`, meta[key])
  }

  return template
}

function parseBlogIndex (globalSiteTemplate, blogIndexTemplate, blogPosts, url) {
  const meta = metaData(blogIndexTemplate.split('\n'))
  return pageParser(meta, globalSiteTemplate, blogIndexTemplate, blogPosts, url)
}

module.exports = {
  parseBlogIndex,
  parseBlogPage
}
