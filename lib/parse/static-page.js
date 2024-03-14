/**
 * _createLinksAsList - Returns links as a list from a given array of blog post objects.
 * @param {array} blogPosts - An array of all of the site's blog posts.
 * @returns {string} Returns an unordered HTML list as a string with links to give blog posts.
 */
const _createLinksAsList = (blogPosts) => {
  if (!blogPosts) return []
  const blogLinks = []
  blogLinks.push('<ul>')

  for (let i = 0; i < blogPosts.length; i++) {
    blogLinks.push(`<li><a href="${blogPosts[i].url}">${blogPosts[i].title}</a></li>`)
  }

  blogLinks.push('</ul>')

  return blogLinks.join('')
}

/**
 * staticPage - Combines templates and meta data to generate HTML pages.
 * @param {string} pageContent - The raw page content.
 * @param {array} blogPosts - An array of all of the site's blog posts.
 * @param {string} globalHtmlTemplate - The global index HTML template.
 * @param {string} url - The site's URL (can be the local or public url).
 * @returns {string} HTML output as a string.
 */
module.exports = (pageContent, blogPosts, globalHtmlTemplate, url) => {
  let parsedHtml = globalHtmlTemplate

  for (const key in pageContent) {
    if (key === 'content') continue
    parsedHtml = parsedHtml.replaceAll(`{{${key}}}`, pageContent[key])
  }

  parsedHtml = parsedHtml.replaceAll('{{content}}', pageContent.content)
  parsedHtml = parsedHtml.replaceAll('{{newestPosts}}', _createLinksAsList(blogPosts.slice(0, 3)))
  parsedHtml = parsedHtml.replaceAll('{{popularPosts}}', _createLinksAsList(blogPosts.filter((a) => { return a.popular })))
  parsedHtml = parsedHtml.replaceAll('{{allPosts}}', _createLinksAsList(blogPosts))
  parsedHtml = parsedHtml.replaceAll('{{siteUrl}}', url)

  return parsedHtml
}
