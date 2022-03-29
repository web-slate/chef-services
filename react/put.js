module.exports = function createPutServiceFile ({ name, serviceName, endpoint, body }) {
const camelCasedServiceName = serviceName.camelCased

return `import usePut from '../../usePut'
// TODO: below import path should be updated.
import { ${endpoint} } from '../path/to/utils/endpoints'

export default function ${name}(methodName) {
  const { response, error, loading, sendPutData } = usePut(
    ${endpoint},
    methodName
  )
  return { response, error, loading, [methodName]: sendPutData }
}

/***
 * Sample Implementation for above Put Services Custom Hook.

// TODO: below import path should be updated.
import ${name} from './path/to/${name}'

// TODO: Call this Custom Hook inside your component.
const {
  response: ${camelCasedServiceName}Response,
  error: ${camelCasedServiceName}Error,
  loading: ${camelCasedServiceName}Loading,
  sendPutData: ${camelCasedServiceName}PostedData
} = ${name}(
  'sendPutData'
)

// TODO: Update the payload value.
const ${camelCasedServiceName}Payload = ${body}

// TODO: paste this below snippet to test this custom hook.
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