module.exports = (rawText, blogRootUrl) => {
  const lines = rawText.split('\n')
  const metaData = {}
  let l
  let match
  let contentStart

  for (let i = 1; i < lines.length - 1; i++) {
    l = lines[i].trim()

    match = /([^:]+):\s?([^:]+)/.exec(l)

    if (match) {
      metaData[match[1]] = match[2]
    }

    contentStart = i + 1

    // close off the meta section
    if (l === '---') {
      break
    }
  }

  const publishedDate = new Date(metaData.date)
  const dateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }

  metaData.unixDate = Math.floor(publishedDate.getTime() / 1000)
  metaData.displayDate = publishedDate.toLocaleDateString('en-GB', dateOptions)
  metaData.content = lines.splice(contentStart + 1).join('\n')
  metaData.contentStart = contentStart
  metaData.url = `${blogRootUrl}/${metaData.slug}.html`
  metaData.fileName = metaData.url.replace(`${blogRootUrl}/`, '')

  return metaData
}
