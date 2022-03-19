const shell = require('shelljs')
const sanitize = require("sanitize-filename")

function createDirectory(pathWithName) {
  return shell.mkdir('-p', pathWithName)
}

function sanitizeName(directoryOrFileName) {
  const sanitized = sanitize(directoryOrFileName)
  const lowerCased = sanitized.toLowerCase()
  const hyphenate = true
  let validName = ''

  lowerCased.split(' ').forEach((subString, index) => {
    if (index === 0) {
      validName = subString.trim()
    } else if (hyphenate && subString.trim() !== '' && index > 0) {
      validName += `-${subString.trim()}`
    }
  })

  return validName
}

function createFile(options) {
  const { pathToFile, data = '' } = options
  return shell.ShellString(data, [['1>', '&2']]).to(pathToFile)
}

module.exports = {
  createDirectory,
  sanitizeName,
  createFile,
}