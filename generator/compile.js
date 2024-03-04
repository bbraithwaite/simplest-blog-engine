const fs = require('fs')
const path = require('path')
const parseTemplates = require('../parser/parse-templates')
const metaData = require('../parser/meta-data')
const blogConfig = JSON.parse(fs.readFileSync('blog.json', 'utf-8'))

const BLOG_FOLDER = 'blog'
const OUTPUT_FOLDER = '_output'
const TEMPLATES_FOLDER = 'templates'
const POSTS_FOLDER = 'posts'
const IMAGES_FOLDER = 'images'

const allPostsMetaData = []

function _buildBlogIndex (globalSiteTemplate) {
  const blogIndexHtml = path.resolve(OUTPUT_FOLDER, BLOG_FOLDER, 'index.html')
  const blogIndexTemplate = _getTemplateFile('blog-index.html')
  const blogIndexContent = parseTemplates.parseBlogIndex(globalSiteTemplate, blogIndexTemplate, allPostsMetaData)

  fs.writeFileSync(blogIndexHtml, blogIndexContent)
}

function _loadBlogPages () {
  const allPosts = fs.readdirSync(path.resolve(POSTS_FOLDER))

  for (let i = 0; i < allPosts.length; i++) {
    // ignore non .sb files
    if (path.extname(allPosts[i]) !== '.sb') continue

    const postContent = fs.readFileSync(path.resolve(POSTS_FOLDER, allPosts[i]), 'utf8')
    const meta = metaData(postContent.split('\n'))

    meta.url = `${blogConfig.devUrl}/${BLOG_FOLDER}/${allPosts[i].replace('.sb', '.html')}`

    allPostsMetaData.push(meta)
  }
}

function _getTemplateFile (fileName) {
  return fs.readFileSync(`${TEMPLATES_FOLDER}/${fileName}`, 'utf8')
}

function _buildBlogPages (globalSiteTemplate) {
  const allPosts = fs.readdirSync(path.resolve(POSTS_FOLDER))
  const blogTemplate = _getTemplateFile('blog.html')

  for (let i = 0; i < allPosts.length; i++) {
    const postContent = fs.readFileSync(path.resolve(POSTS_FOLDER, allPosts[i]), 'utf8')
    const blogPageContent = parseTemplates.parseBlogPage(globalSiteTemplate, postContent, blogTemplate)
    const targetHtmlFile = path.resolve(OUTPUT_FOLDER, BLOG_FOLDER, allPosts[i].replace('.sb', '.html'))

    fs.writeFileSync(targetHtmlFile, blogPageContent)
  }
}

function _buildPage (globalSiteTemplate, targetFile) {
  const indexContentHtml = fs.readFileSync(`${targetFile}.html`, 'utf8')

  globalSiteTemplate = parseTemplates.parsePage(globalSiteTemplate, indexContentHtml)

  fs.writeFileSync(`${OUTPUT_FOLDER}/${targetFile}.html`, globalSiteTemplate)
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
  const globalSiteTemplate = _getTemplateFile('index.html')

  console.log('1. Re-generating output folder...')
  _deleteFolder(OUTPUT_FOLDER)
  _createFolder(OUTPUT_FOLDER)
  _createFolder(`${OUTPUT_FOLDER}/${BLOG_FOLDER}`)
  _createFolder(`${OUTPUT_FOLDER}/${IMAGES_FOLDER}`)

  // TODO: make dynamic
  const images = fs.readdirSync(path.resolve(IMAGES_FOLDER))

  for (let i = 0; i < images.length; i++) {
    _copyFile(`${IMAGES_FOLDER}/${images[i]}`, `${OUTPUT_FOLDER}/${IMAGES_FOLDER}/${images[i]}`)
  }

  console.log('2. Building static pages...')
  _buildPage(globalSiteTemplate, 'index')
  _buildPage(globalSiteTemplate, '404')
  _copyFile('style.css', `${OUTPUT_FOLDER}/style.css`)

  console.log('3. Generating blog entries...')
  _loadBlogPages()
  _buildBlogPages(globalSiteTemplate)
  _buildBlogIndex(globalSiteTemplate)

  console.log('\nDone!\n')
}

module.exports = () => {
  console.log('Re-generating blog entries...')
  const globalSiteTemplate = _getTemplateFile('index.html')
  _buildBlogPages(globalSiteTemplate)
}

_doBuild()
