const templateParser = require('../parser/parse-templates')
const test = require('./test')
const testThat = test.that

const indexTemplate = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>{{title}}</title><link rel="stylesheet" type="text/css" href="style.css"></head><body><div class="content">{{content}}</div></body></html>'
const indexContent = '---\ntitle: Page Title\n---\n\n<p>Page Content</p>'

testThat(
  'index template is parsed',
  () => { return templateParser.parsePage(indexTemplate, indexContent) },
  '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Page Title</title><link rel="stylesheet" type="text/css" href="style.css"></head><body><div class="content"><p>Page Content</p></div></body></html>'
)
