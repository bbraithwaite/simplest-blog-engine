const path = require('path')

const parseContent = require('../parse/content')
const parsePosts = require('../parse/posts')
const config = require('./blog-config')
const fileManager = require('./file-manager')
const parseStaticPage = require('../parse/static-page')

const SIMPLEST_BLOG_EXTENSION = '.sb'

const getBlogPosts = () => {
  const rawPostsContent = []
  
  // get the raw files
  fileManager.readDirectory(config.getPostsFolder()).forEach((post) => {
    if (path.extname(post) !== SIMPLEST_BLOG_EXTENSION) return
    rawPostsContent.push(fileManager.readFile(`${config.getPostsFolder()}/${post}`))
  })

  return parsePosts(rawPostsContent, config.getSiteUrl())
}

const setupFolders = (config) => {
  fileManager.deleteFolder(config.getOutputFolder())
  fileManager.createFolder(config.getOutputFolder())
  fileManager.createFolder(config.getBlogFolder())

  config.getFoldersToCopy().forEach((source) => {
    fileManager.createFolder(`${config.getOutputFolder()}/${source}`)
    fileManager.copyFolder(source, config.getOutputFolder())
  })
}

const copyStaticFiles = (config) => {
  config.getFilesToCopy().forEach((file) => {
    fileManager.copyFile(file, `${config.getOutputFolder()}/${file}`)
  })
}

const createStaticPages = (config, blogPosts, globalHtmlTemplate, siteUrl) => {
  config.getStaticPages().forEach((pageName) => {
    const pageContent = parseContent(fileManager.readFile(pageName), siteUrl)
    const content = parseStaticPage(pageContent, blogPosts, globalHtmlTemplate, config.getSiteUrl())
    fileManager.writeFile(`${config.getOutputFolder()}/${pageName}`, content)
  })
}

const createBlogPostPages = (config, blogPosts, globalHtmlTemplate, blogPostTemplate) => {
  blogPosts.forEach((post) => {
    // parse the blog template
    post.content = parseStaticPage(post, blogPosts, blogPostTemplate, config.getSiteUrl())

    // parse the main template
    const content = parseStaticPage(post, blogPosts, globalHtmlTemplate, config.getSiteUrl())
    fileManager.writeFile(`${config.getBlogFolder()}/${post.fileName}`, content)
  })
}

/**
 * build - Build the entire site.
 *
 */ 
const build = () => {
  if (process.argv[2] === 'publish') {
    config.setPublishMode(1)
  }

  const blogPostHtmlTemplate = fileManager.readFile(config.getBlogTemplate())
  const globalHtmlTemplate = fileManager.readFile(config.getGlobalTemplate())
  const blogPosts = getBlogPosts()

  setupFolders(config)
  copyStaticFiles(config)
  createStaticPages(config, blogPosts, globalHtmlTemplate, config.getSiteUrl())
  createBlogPostPages(config, blogPosts, globalHtmlTemplate, blogPostHtmlTemplate)
}

module.exports = {
	build: build
}