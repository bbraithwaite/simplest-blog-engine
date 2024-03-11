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
    blogLinks.push(`\n<li><a href="${blogPosts[i].url}">${blogPosts[i].title}</a></li>`)
  }

  blogLinks.push('\n</ul>')

  return blogLinks.join('')
}

/**
 * parsePage - Combines templates and meta data to generate HTML pages.
 * @param {object} metaData - The meta data for the page.
 * @param {string} globalHtmlTemplate - The global index HTML template.
 * @param {array} blogPosts - An array of all of the site's blog posts.
 * @param {string} url - The site's URL (can be the local or public url).
 * @returns {string} HTML output as a string.
 */
module.exports = (metaData, globalHtmlTemplate, pageContent, blogPosts, url) => {
  let parsedHtml = globalHtmlTemplate

  for (const key in metaData) {
    if (key === 'content') continue
    parsedHtml = parsedHtml.replaceAll(`{{${key}}}`, metaData[key])
  }

  parsedHtml = parsedHtml.replaceAll('{{content}}', metaData.content)
  parsedHtml = parsedHtml.replaceAll('{{newestPosts}}', _createLinksAsList(blogPosts.slice(0, 3)))
  parsedHtml = parsedHtml.replaceAll('{{popularPosts}}', _createLinksAsList(blogPosts.filter((a) => { return a.popular })))
  parsedHtml = parsedHtml.replaceAll('{{allPosts}}', _createLinksAsList(blogPosts))
  parsedHtml = parsedHtml.replaceAll('{{url}}', url)

  return parsedHtml
}
