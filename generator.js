#! /usr/bin/env node
const program = require('commander')
const path = require('path')

const { error } = require('./utils/message')
const { createDirectory, sanitizeName, sanitizeAndPascalCase, sanitizeAndCamelCase, createFile } = require('./utils/files')
const { createServiceFile, createUtilFile } = require('./react')
const packageJson = require("./package.json");

program
  .name('@chef/services')
  .description('CLI to generate your API specific code in lightening speed')
  .version(packageJson.version)
  .option('-f, --postmanFile <value>', 'postman collection exported file')
  .option('-l, --location <value>', 'location separated by slashes')
  .option('-u, --utilLocation <value>', 'location separated by slashes')
  .parse()

const { postmanFile, location = 'hooks/services', utilLocation = 'utils' } = program.opts()

const FILE_EXTENSION = 'js'
const DEFINITION_FILE = postmanFile

if (!DEFINITION_FILE) {
  error('Please provide a postman exported collection file.')
}

const postmanCollectionJson = require(path.resolve(DEFINITION_FILE))

const { item: collections = [] } = postmanCollectionJson || {}
const endpointList = []

if (Array.isArray(collections)) {
  collections.forEach(collectionItem => {
    const directoryName = sanitizeName(collectionItem?.name)
    createDirectory(
      path.resolve(location, directoryName)
    )

    if (Array.isArray(collectionItem?.item)) {
      collectionItem.item.forEach(apiItem => {
        const pascalCasedServiceName = sanitizeAndPascalCase(apiItem?.name)
        const customHookName = `use${pascalCasedServiceName}`
        const customHookFile = `${customHookName}.${FILE_EXTENSION}`
        const { method, url = {}, body = {} } = apiItem?.request || {}

        if (!method || !url?.raw) {
          return
        }

        const endpointName = sanitizeName(apiItem?.name, { replaceWith: '_'}).toUpperCase()
        endpointList.push({
          name: endpointName,
          url
        })

        createFile({
          pathToFile: path.resolve(location, directoryName, customHookFile),
          data: createServiceFile({
            name: customHookName,
            serviceName: {
              default: apiItem?.name,
              camelCased: sanitizeAndCamelCase(apiItem?.name),
              pascalCased: pascalCasedServiceName,
            },
            method,
            endpoint: endpointName,
            body: body?.raw || '' 
          })
        })
      })
    }
  })

  createDirectory(
    path.resolve(location, utilLocation)
  )

  createFile({
    pathToFile: path.resolve(location, utilLocation, `endpoints.${FILE_EXTENSION}`),
    data: createUtilFile(endpointList)
  })
}