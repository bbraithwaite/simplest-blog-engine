// const metaData = require('./meta-data')
// const parser = require('./content')
// const pageParser = require('./page')

// function parseBlogPage (globalSiteTemplate, post, blogTemplate, blogPosts, url) {
//   const meta = metaData(post.split)
//   meta.content = parser(post).tree.join('')

//   let template = pageParser(meta, globalSiteTemplate, blogTemplate, blogPosts, url)

//   for (const key in meta) {
//     if (key === 'content') continue
//     template = template.replaceAll(`{{${key}}}`, meta[key])
//   }

//   return template
// }

// function parseBlogIndex (globalSiteTemplate, blogIndexTemplate, blogPosts, url) {
//   const meta = metaData(blogIndexTemplate)
//   return pageParser(meta, globalSiteTemplate, blogIndexTemplate, blogPosts, url)
// }

// module.exports = {
//   parseBlogIndex,
//   parseBlogPage
// }
