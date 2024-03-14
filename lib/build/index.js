const generateSite = require('./generate-site')

let publishMode = 0

if (process.argv[2] === 'publish') {
	publishMode = 1
}

generateSite.build(publishMode)