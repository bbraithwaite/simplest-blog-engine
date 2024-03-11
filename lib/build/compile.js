const fs = require('fs')
const path = require('path')

const pageParser = require('../parse/parse-page')
const parseTemplates = require('../parse/parse-templates')
const metaData = require('../parse/meta-data')
const blogConfig = require('../blog-config')

const BLOG_FOLDER = 'blog'
const LOCAL_FOLDER = '_output'
const PUBLISHED_FOLDER = '_published'
const TEMPLATES_FOLDER = 'templates'
const POSTS_FOLDER = 'posts'
const IMAGES_FOLDER = 'images'

const SIMPLEST_BLOG_EXTENSION = '.sb'

const allPostsMetaData = []

let OUTPUT_FOLDER = LOCAL_FOLDER
let PUBLISH_MODE = 0

const _loadBlogPages = () => {
  const allPosts = fs.readdirSync(path.resolve(POSTS_FOLDER))

  for (let i = 0; i < allPosts.length; i++) {
    // ignore non .sb files
    if (path.extname(allPosts[i]) !== SIMPLEST_BLOG_EXTENSION) continue

    const postContent = fs.readFileSync(path.resolve(POSTS_FOLDER, allPosts[i]), 'utf8')
    const meta = metaData(postContent.split('\n'))

    meta.url = `${blogConfig.getSiteUrl(PUBLISH_MODE)}/${BLOG_FOLDER}/${allPosts[i].replace(SIMPLEST_BLOG_EXTENSION, '.html')}`

    allPostsMetaData.push(meta)
  }

  // sort the links by publish date
  allPostsMetaData.sort((a, b) => b.unixDate - a.unixDate)
}

function _buildBlogIndex (globalHtmlTemplate) {
  const blogIndexHtml = path.resolve(OUTPUT_FOLDER, BLOG_FOLDER, 'index.html')
  const blogIndexTemplate = _getTemplateFile('blog-index.html')
  const blogIndexContent = parseTemplates.parseBlogIndex(globalHtmlTemplate, blogIndexTemplate, allPostsMetaData, blogConfig.getSiteUrl(PUBLISH_MODE))

  fs.writeFileSync(blogIndexHtml, blogIndexContent)
}

function _getTemplateFile (fileName) {
  return fs.readFileSync(`${TEMPLATES_FOLDER}/${fileName}`, 'utf8')
}

function _buildBlogPages (globalHtmlTemplate) {
  const allPosts = fs.readdirSync(path.resolve(POSTS_FOLDER))
  const blogTemplate = _getTemplateFile('blog.html')

  for (let i = 0; i < allPosts.length; i++) {
    const postContent = fs.readFileSync(path.resolve(POSTS_FOLDER, allPosts[i]), 'utf8')
    const blogPageContent = parseTemplates.parseBlogPage(globalHtmlTemplate, postContent, blogTemplate, allPostsMetaData, blogConfig.getSiteUrl(PUBLISH_MODE))
    const targetHtmlFile = path.resolve(OUTPUT_FOLDER, BLOG_FOLDER, allPosts[i].replace('.sb', '.html'))

    fs.writeFileSync(targetHtmlFile, blogPageContent)
  }
}

function _buildPage (globalHtmlTemplate, targetFile) {
  const pageContent = fs.readFileSync(`${targetFile}.html`, 'utf8')
  const meta = metaData(pageContent.split('\n'))

  globalHtmlTemplate = pageParser(meta, globalHtmlTemplate, pageContent, allPostsMetaData, blogConfig.getSiteUrl(PUBLISH_MODE))

  fs.writeFileSync(`${OUTPUT_FOLDER}/${targetFile}.html`, globalHtmlTemplate)
}

function _deleteFolder (dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true }, () => {})
  }
}

function _createFolder (dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}

function _copyFile (from, to) {
  fs.copyFile(from, to, (err) => {
    if (err) throw err
  })
}

function _doBuild () {
  const globalHtmlTemplate = _getTemplateFile('index.html')

  const args = process.argv
  if (args[2] === 'publish') {
    PUBLISH_MODE = 1
    OUTPUT_FOLDER = PUBLISHED_FOLDER
  }

  console.log('1. Re-generating output folder...')
  _deleteFolder(OUTPUT_FOLDER)
  _createFolder(OUTPUT_FOLDER)
  _createFolder(`${OUTPUT_FOLDER}/${BLOG_FOLDER}`)
  _createFolder(`${OUTPUT_FOLDER}/${IMAGES_FOLDER}`)

  const images = fs.readdirSync(path.resolve(IMAGES_FOLDER))

  for (let i = 0; i < images.length; i++) {
    _copyFile(`${IMAGES_FOLDER}/${images[i]}`, `${OUTPUT_FOLDER}/${IMAGES_FOLDER}/${images[i]}`)
  }

  console.log('2. Building static pages...')
  _loadBlogPages()
  _buildPage(globalHtmlTemplate, 'index')
  _buildPage(globalHtmlTemplate, '404')
  _buildPage(globalHtmlTemplate, 'about')
  _copyFile('style.css', `${OUTPUT_FOLDER}/style.css`)

  console.log('3. Generating blog entries...')
  _buildBlogPages(globalHtmlTemplate)
  _buildBlogIndex(globalHtmlTemplate)

  console.log('\nDone!\n')
}

module.exports = () => {
  console.log('Re-generating blog entries...')
  const globalHtmlTemplate = _getTemplateFile('index.html')
  _buildBlogPages(globalHtmlTemplate)
}

_doBuild()