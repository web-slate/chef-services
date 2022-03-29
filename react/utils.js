module.exports = function createUtilFile (endpointList = []) {
  let utilContent = ''
  endpointList.forEach(({ name, url }) => {
    if (name && url?.path) {
      utilContent += `export const ${name} = '${url.path.join('/')}'\n\n`
    } 
  })

return utilContent
}