#! /usr/bin/env node
const program = require('commander')
const fs = require('fs')
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

const DEFINITION_FILE = firstParam || postmanFile

if (!DEFINITION_FILE) {
  error('Please provide a postman exported collection file.')
}

const postmanCollectionJson = require(path.resolve(__dirname, DEFINITION_FILE))

const { item: collections = [] } = postmanCollectionJson || {}

if (Array.isArray(collections)) {
  collections.forEach(item => {
    createDirectory(
      path.resolve(__dirname, location, sanitizeName(item?.name))
    )
  })
}