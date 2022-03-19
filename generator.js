#! /usr/bin/env node
const program = require('commander')
const path = require('path')

const { error } = require('./utils/message')
const { createDirectory, sanitizeName, createFile } = require('./utils/files')
const packageJson = require("./package.json");

program
  .name('@chef/services')
  .description('CLI to generate your API specific code in lightening speed')
  .version(packageJson.version)
  .option('-f, --postmanFile <value>', 'postman collection exported file')
  .option('-l, --location <value>', 'location separated by slashes')
  .parse()

const firstParam = program.args[0]
const { postmanFile, location = 'hooks' } = program.opts()
const generateLocation = location.split('/')

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
        const customHookName = `use${sanitizeName(apiItem?.name, { pascalCase: true })}`
        const customHookFile = `${customHookName}.${FILE_EXTENSION}`
        createFile({
          pathToFile: path.resolve(__dirname, location, directoryName, customHookFile),
          data: `export { default } from './${customHookName}'`
        })
      })
    }
  })
}