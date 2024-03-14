const path = require('path')
const fs = require('fs')

const deleteFolder = (dir) => {
  if (fs.existsSync(dir)) {
  	console.log(`- Deleting Folder: ${dir}`)
    fs.rmSync(dir, { recursive: true }, () => {})
  }
}

const createFolder = (dir) => {
  if (!fs.existsSync(dir)) {
  	console.log(`- Creating Folder: ${dir}`)
    fs.mkdirSync(dir)
  }
}

const copyFile = (from, to) => {
	console.log(`- Copying File: ${from} to ${to}`)
  	fs.copyFile(from, to, (err) => {
    	if (err) throw err
  	})
}

const copyFolder = (sourceFolder, outputFolder) => {
	console.log(`- Copying Folder: ${sourceFolder} to ${outputFolder}`)
	const files = readDirectory(sourceFolder)
	for (let i = 0; i < files.length; i++) {
    	copyFile(`${sourceFolder}/${files[i]}`, `${outputFolder}/${sourceFolder}/${files[i]}`)
	}
}

const readDirectory = (targetFolder) => {
	return fs.readdirSync(path.resolve(targetFolder))
}

const readFile = (targetFile) => {
	console.log(`- Reading File: ${targetFile}`)
	return fs.readFileSync(targetFile, 'utf8')
}

const writeFile = (file, content) => {
	console.log(`- Writing file: ${file}`)
	fs.writeFileSync(file, content)
}

module.exports = {
	copyFolder,
	copyFile,
	createFolder,
	deleteFolder,
	readDirectory,
	readFile,
	writeFile
}
