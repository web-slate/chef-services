module.exports = function createPutServiceFile ({ name, endpoint }) {
return `import usePut from '../../usePut'

export default function ${name}(methodName) {
  const { response, error, loading, sendPutData } = usePut(
    '${endpoint}',
     methodName
  )
  return { response, error, loading, [methodName]: sendPutData }
}
`
}