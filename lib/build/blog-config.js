const fs = require('fs')
const blogConfig = JSON.parse(fs.readFileSync('blog.json', 'utf-8'))

const BLOG_FOLDER = 'blog'
const POSTS_FOLDER = 'posts'
const TEMPLATES_FOLDER = 'templates'

let publishMode = 0

const getBlogFolder = () => {
  return `${getOutputFolder(publishMode)}/${BLOG_FOLDER}`
}

const getPostsFolder = () => {
  return POSTS_FOLDER
}

const getGlobalTemplate = () => {
  return `${TEMPLATES_FOLDER}/index.html`
}

const getBlogTemplate = () => {
  return `${TEMPLATES_FOLDER}/blog.html`
}

const getFilesToCopy = () => {
  return blogConfig.filesToCopy
}

const getFoldersToCopy = () => {
  return blogConfig.foldersToCopy
}

const getOutputFolder = () => {
  return (publishMode) ? blogConfig.publishedOutput : blogConfig.localOutput
}

const getSitePort = () => {
  return blogConfig.devPort
}

const getSiteUrl = () => {
  return (publishMode) ? blogConfig.publishedUrl : blogConfig.devUrl
}

const getStaticPages = () => {
  return blogConfig.staticPages
}

const setPublishMode = (mode) => {
  publishMode = mode
}

module.exports = {
  getBlogTemplate,
  getBlogFolder,
  getPostsFolder,
  getGlobalTemplate,
  getFilesToCopy,
  getFoldersToCopy,
  getOutputFolder,
  getSitePort,
  getSiteUrl,
  getStaticPages,
  setPublishMode
}
