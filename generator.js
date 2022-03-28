#! /usr/bin/env node
const program = require('commander')
const path = require('path')

const { error } = require('./utils/message')
const { createDirectory, sanitizeName, sanitizeAndPascalCase, sanitizeAndCamelCase, createFile } = require('./utils/files')
const createServiceFile = require('./react')
const packageJson = require("./package.json");

program
  .name('@chef/services')
  .description('CLI to generate your API specific code in lightening speed')
  .version(packageJson.version)
  .option('-f, --postmanFile <value>', 'postman collection exported file')
  .option('-l, --location <value>', 'location separated by slashes')
  .parse()

const firstParam = program.args[0]
const { postmanFile, location = 'hooks/services' } = program.opts()

const FILE_EXTENSION = 'js'
const DEFINITION_FILE = firstParam || postmanFile

if (!DEFINITION_FILE) {
  error('Please provide a postman exported collection file.')
}

const postmanCollectionJson = require(path.resolve(__dirname, DEFINITION_FILE))

const { item: collections = [] } = postmanCollectionJson || {}

if (Array.isArray(collections)) {
  collections.forEach(collectionItem => {
    const directoryName = sanitizeName(collectionItem?.name)
    createDirectory(
      path.resolve(__dirname, location, directoryName)
    )

    if (Array.isArray(collectionItem?.item)) {
      collectionItem.item.forEach(apiItem => {
        const pascalCasedServiceName = sanitizeAndPascalCase(apiItem?.name)
        const customHookName = `use${pascalCasedServiceName}`
        const customHookFile = `${customHookName}.${FILE_EXTENSION}`
        const { method, url, body } = apiItem?.request

        if (!method) {
          return
        }

        createFile({
          pathToFile: path.resolve(__dirname, location, directoryName, customHookFile),
          data: createServiceFile({
            name: customHookName,
            serviceName: {
              default: apiItem?.name,
              camelCased: sanitizeAndCamelCase(apiItem?.name),
              pascalCased: pascalCasedServiceName,
            },
            method,
            endpoint: url?.raw || '',
            body: body?.raw || '' 
          })
        })
      })
    }
  })
}