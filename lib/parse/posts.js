const parseContent = require('./content')

/**
 * parsePosts - Takes an array of raw simplest blog posts
 * @param {array} rawPosts - An array of raw posts from the /posts folder.
 * @param {string} url - The site's URL (can be the local or public url).
 * @returns {array} A sorted array (based on publication date) that contains each post with meta data and content.
 */
module.exports = (rawPosts, blogRootUrl) => {
  const parsedPosts = []

  for (let i = 0; i < rawPosts.length; i++) {
    parsedPosts.push(parseContent(rawPosts[i], blogRootUrl))
  }

  // sort the links by publish date
  parsedPosts.sort((a, b) => b.unixDate - a.unixDate)

  return parsedPosts
}
