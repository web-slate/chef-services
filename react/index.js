const createGetServiceFile = require('./get')
const createPostServiceFile = require('./post')
const createPutServiceFile = require('./put')
const createDeleteServiceFile = require('./delete')
const createUtilFile = require('./utils')

function createServiceFile (options) {
  const { name, method } = options
  const creatorMapping = {
    GET: createGetServiceFile,
    POST: createPostServiceFile,
    PUT: createPutServiceFile,
    DELETE: createDeleteServiceFile,
  }
  const serviceCreator = creatorMapping[method]

  if (serviceCreator) {
    return serviceCreator(options)
  }

  return `export default function ${name}() { }`
}

module.exports = {
  createServiceFile,
  createUtilFile,
}