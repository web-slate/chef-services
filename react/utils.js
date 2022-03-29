module.exports = function createUtilFile (endpointList = []) {
  const protocol = endpointList[0]?.url?.protocol || ''
  const hostName = endpointList[0]?.url?.(host || []).join('.') || ''

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