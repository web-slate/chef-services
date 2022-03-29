#! /usr/bin/env node
const program = require('commander')
const path = require('path')

const { error } = require('./utils/message')
const { createDirectory, sanitizeName, sanitizeAndPascalCase, sanitizeAndCamelCase, createFile } = require('./utils/files')
const { createServiceFile, createUtilFile } = require('./react')
const packageJson = require("./package.json");
const { ADDRGETNETWORKPARAMS } = require('dns')

program
  .name('@chef/services')
  .description('CLI to generate your API specific code in lightening speed')
  .version(packageJson.version)
  .option('-f, --postmanFile <value>', 'postman collection exported file')
  .option('-l, --location <value>', 'location separated by slashes')
  .option('-u, --utilLocation <value>', 'location separated by slashes')
  .parse()

try {
  const { postmanFile, location = 'hooks/services', utilLocation = 'utils' } = program.opts()

  const FILE_EXTENSION = 'js'
  const DEFINITION_FILE = postmanFile

  if (!DEFINITION_FILE) {
    error('Please provide a postman exported collection file.')
  }

  const postmanCollectionJson = require(path.resolve(DEFINITION_FILE))

  const { item: collections = [] } = postmanCollectionJson || {}
  const endpointList = []

  const getEndpoinName = (apiItem) => {
    return sanitizeName(apiItem?.name, { replaceWith: '_' }).toUpperCase()
  }

  const createServiceEngine = (apiItem = {}, directoryName) => {
    const pascalCasedServiceName = sanitizeAndPascalCase(apiItem?.name)
    const customHookName = `use${pascalCasedServiceName}`
    const customHookFile = `${customHookName}.${FILE_EXTENSION}`
    const { method, url = {}, body = {} } = apiItem?.request || {}

    if (!method || !url?.raw) {
      return
    }

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
        endpoint: getEndpoinName(apiItem),
        body: body?.raw || ''
      })
    })
  }

  if (Array.isArray(collections)) {
    createDirectory(
      path.resolve(location)
    )

    let directoryName = ''
    collections.forEach(collectionItem => {
      if (Array.isArray(collectionItem?.item)) {
        directoryName = sanitizeName(collectionItem?.name)
        createDirectory(
          path.resolve(location, directoryName)
        )

        collectionItem?.item.forEach(apiItem => {
          const { url = {} } = apiItem?.request || {}
          endpointList.push({
            name: getEndpoinName(apiItem),
            url
          })
          createServiceEngine(apiItem, directoryName)
        })
      } else {
        const { url = {} } = collectionItem?.request || {}
        endpointList.push({
          name: getEndpoinName(collectionItem),
          url
        })
        createServiceEngine(collectionItem, directoryName)
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
  console.log('Service Files created. Happy Coding!')

} catch (err) {
  console.log('Error while reading file.', err);
}