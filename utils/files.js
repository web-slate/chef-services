const shell = require('shelljs')
const sanitize = require("sanitize-filename")

function toPascalCase(input){
  return `${input}`
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .replace(
      new RegExp(/\s+(.)(\w+)/, 'g'),
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\s/, 'g'), '')
    .replace(new RegExp(/\w/), s => s.toUpperCase());
}

function createDirectory(pathWithName) {
  return shell.mkdir('-p', pathWithName)
}

function sanitizeName(directoryOrFileName, options = {}) {
  const { replaceWith = '-', skipReplaceOnFirstItem = true, pascalCase = false } = options || {}
  const sanitized = sanitize(directoryOrFileName)
  const lowerCased = sanitized.toLowerCase()
  let validName = ''

  lowerCased.split(' ').forEach((subString, index) => {
    const trimmedSubString = subString.trim()
    if (pascalCase) {
      validName += toPascalCase(trimmedSubString)
    } else if (skipReplaceOnFirstItem && index === 0) {
      validName += trimmedSubString
    } else if (trimmedSubString !== '' && replaceWith !== '') {
      validName += `${replaceWith}${trimmedSubString}`
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