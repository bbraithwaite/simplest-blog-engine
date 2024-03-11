const pageParser = require('../parser/parse-page')
const test = require('./test')
const testThat = test.that

const pageUrl = 'http://localhost:3000'
const metaData = {
  title: 'The Simplest Blog'
}
const blogPosts = [{
  title: 'Fourth Post',
  popular: true,
  url: 'http://localhost:3000/blog/fourth-post.html'
},
{
  title: 'Third Post',
  url: 'http://localhost:3000/blog/third-post.html'
},
{
  title: 'Second Post',
  url: 'http://localhost:3000/blog/second-post.html'
},
{
  title: 'First Post',
  url: 'http://localhost:3000/blog/first-post.html'
}]

const getTestTemplate = (content) => {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>{{title}}</title><link rel="stylesheet" type="text/css" href="style.css"></head><body><div class="content">${content}</div></body></html>`
}

const getExpectedTemplate = (content) => {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>The Simplest Blog</title><link rel="stylesheet" type="text/css" href="style.css"></head><body><div class="content">${content}</div></body></html>`
}

const getListHtml = (list) => {
  const links = []
  for (let i = 0; i < list.length; i++) {
    links.push(`<li><a href="${list[i].url}">${list[i].title}</a></li>\n`)
  }
  return links.join('')
}

const appendContent = (content) => {
  metaData.content = content
  return metaData
}

testThat(
  'parsing page replaces content',
  () => { return pageParser(appendContent('<p>Page Content</p>'), getTestTemplate('{{content}}'), '', blogPosts) },
  getExpectedTemplate('<p>Page Content</p>')
)

testThat(
  'parsing page replaces {{url}} tag',
  () => { return pageParser(appendContent('<p>Page Content. Replace this {{url}}.</p>'), getTestTemplate('{{content}}'), '', blogPosts, pageUrl) },
  getExpectedTemplate('<p>Page Content. Replace this http://localhost:3000.</p>')
)

testThat(
  'parsing page replaces {{newestPosts}} tag',
  () => { return pageParser(appendContent('{{newestPosts}}'), getTestTemplate('{{content}}'), '', blogPosts, pageUrl) },
  getExpectedTemplate(`<ul>\n${getListHtml(blogPosts.slice(0, 3))}</ul>`)
)

testThat(
  'parsing page replaces {{popularPosts}} tag',
  () => { return pageParser(appendContent('{{popularPosts}}'), getTestTemplate('{{content}}'), '', blogPosts, pageUrl) },
  getExpectedTemplate(`<ul>\n${getListHtml([blogPosts[0]])}</ul>`)
)

testThat(
  'parsing page replaces {{allPosts}} tag',
  () => { return pageParser(appendContent('{{allPosts}}'), getTestTemplate('{{content}}'), '', blogPosts, pageUrl) },
  getExpectedTemplate(`<ul>\n${getListHtml(blogPosts)}</ul>`)
)
