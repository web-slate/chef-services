module.exports = function createUtilFile (endpointList = []) {
  const protocol = endpointList[0]?.url?.protocol || ''
  const { host = [] } = endpointList[0]?.url || {}
  const hostName = (host || []).join('.') || ''

  let utilContent = `function getBasePath() {
  return '${protocol}:/\/${hostName}'
}

`
  endpointList.forEach(({ name, url }) => {
    if (name && url?.path) {
      utilContent += `export const ${name} = \`\$\{getBasePath()\}/${url.path.join('/')}\`\n\n`
    } 
  })

return utilContent
}