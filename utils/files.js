const shell = require('shelljs')
const sanitize = require("sanitize-filename")

function removeSpecialCharactersAndSanitize(directoryOrFileName){
  // Allow letters and numbers, replace other characters with _
  const string = directoryOrFileName.replace(/[^a-zA-Z0-9]/g,'_')
  return sanitize(string)
}

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

function toCamelCase(input) {
	let STR = input.toLowerCase()
		.trim()
		.split(/[ -_]/g)
		.map(word => word.replace(word[0] || '', (word[0] || '').toString().toUpperCase()))
		.join('')
	return STR.replace(STR[0], STR[0].toLowerCase())
}

function createDirectory(pathWithName) {
  return shell.mkdir('-p', pathWithName)
}

function sanitizeName(directoryOrFileName, options = {}) {
  const { replaceWith = '-', skipReplaceOnFirstItem = true, pascalCase = false, camelCase = false } = options || {}
  const sanitized = removeSpecialCharactersAndSanitize(directoryOrFileName)
  const lowerCased = sanitized.toLowerCase()
  let validName = ''

  lowerCased.split(' ').forEach((subString, index) => {
    const trimmedSubString = subString.trim()
    if (pascalCase) {
      validName += toPascalCase(trimmedSubString)
    } else if (camelCase) {
      validName += toCamelCase(trimmedSubString)
    } else if (skipReplaceOnFirstItem && index === 0) {
      validName += trimmedSubString
    } else if (trimmedSubString !== '' && replaceWith !== '') {
      validName += `${replaceWith}${trimmedSubString}`
    }
  })

  return validName
}

function sanitizeAndPascalCase(word) {
  if (!word) return ''
  return sanitizeName(word, { pascalCase: true })
}

function sanitizeAndCamelCase(word) {
  if (!word) return ''
  return toCamelCase(word)
}

function createFile(options) {
  const { pathToFile, data = '' } = options
  return shell.ShellString(data, [['1>', '&2']]).to(pathToFile)
}

module.exports = {
  createDirectory,
  toPascalCase,
  toCamelCase,
  sanitizeAndPascalCase,
  sanitizeAndCamelCase,
  sanitizeName,
  createFile,
}