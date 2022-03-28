module.exports = function createPutServiceFile ({ name, serviceName, endpoint, body }) {
const camelCasedServiceName = serviceName.camelCased

return `import usePut from '../../usePut'

export default function ${name}(methodName) {
  const { response, error, loading, sendPutData } = usePut(
    '${endpoint}',
     methodName
  )
  return { response, error, loading, [methodName]: sendPutData }
}

/***
 * Sample Implementation for above Put Services Custom Hook.

// Services
import ${name} from './path/to/${name}'

// Inside your component.
const {
  response: ${camelCasedServiceName}Response,
  error: ${camelCasedServiceName}Error,
  loading: ${camelCasedServiceName}Loading,
  sendPutData: ${camelCasedServiceName}PostedData
} = ${name}(
  'sendPutData'
)

const ${camelCasedServiceName}Payload = ${body}

return (
  <pre>
    <pre>{JSON.stringify(${camelCasedServiceName}Payload)}</pre>
    <div><button type="button" onClick={()=>{${camelCasedServiceName}PostedData(${camelCasedServiceName}Payload)}}>${serviceName.default}</button></div>
    <div>Response:</div>
    <pre>
      {${camelCasedServiceName}Loading && 'Put ${camelCasedServiceName} Loading...'}
      {${camelCasedServiceName}Error && \`${camelCasedServiceName} Error: \$\{${camelCasedServiceName}Error.message\}\`}
      {${camelCasedServiceName}Response && JSON.stringify(${camelCasedServiceName}Response)}
    </pre>
  </pre>
)
*/
`
}