const blockquote = /^>\s(.*)/g // > blockquote example
const bold = /\*\*([^*]+)\*\*/g // **bold example**
const boldEscape = /\\\*/g // match on \*
const h1 = /^h1\s(.*)/g // h1 heading example
const h2 = /^h2\s(.*)/g // h2 heading example
const h3 = /^h3\s(.*)/g // h3 heading example
const h4 = /^h4\s(.*)/g // h3 heading example
const h5 = /^h5\s(.*)/g // h3 heading example
const h6 = /^h6\s(.*)/g // h3 heading example
const horizontalRule = /^---/g // --- hr example
const italic = /~~([^~]*)~~/g // __italic example__
const underline = /__([^_]*)__/g // underline example__
const italicEscape = /\\-/g // match on \-
const underlineEscape = /\\_/g // match on \_
const newLineEscape = /\\n/g // match on \n
const orderedList = /^[0-9]+\.\s(.*)/g // match on 1. list item
const unorderedList = /^-\s(.*)/g // match on - list item
const table = /^tr\s(.*)/g
const tableHeader = /^th\s(.*)/g

// eslint-disable-next-line
const anchor = /\[([^\|]*)\|([^\|]*)\|([^\|]*)\]/g // match on hyperlink [display text|url|title text]

// eslint-disable-next-line
const image = /\{([^\|]*)\|([^\|]*)}/g // match on image {image url|alt text}

// eslint-disable-next-line
const imageDimensions = /\{([^\|]*)\|([^\|]*)\|([0-9]+)\|([0-9]+)}/g // match on image with dimenstions {image url|alt text|width|height}

module.exports = {
  anchor,
  blockquote,
  bold,
  boldEscape,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  horizontalRule,
  italic,
  italicEscape,
  newLineEscape,
  orderedList,
  unorderedList,
  image,
  imageDimensions,
  table,
  tableHeader,
  underline,
  underlineEscape
}
