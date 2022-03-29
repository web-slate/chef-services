module.exports = function createDeleteServiceFile ({ name, serviceName, endpoint, body }) {
const camelCasedServiceName = serviceName.camelCased

return `import useDelete from '../../useDelete'
// TODO: below import path should be updated.
import { ${endpoint} } from '../path/to/utils/endpoints'

export default function ${name}(methodName) {
  const { response, error, loading, sendDeleteData } = useDelete(
    ${endpoint},
    methodName
  )
  return { response, error, loading, [methodName]: sendDeleteData }
}

/***
 * Sample Implementation for above Delete Services Custom Hook.

 // TODO: below import path should be updated.
import ${name} from './path/to/${name}'

// TODO: call this Custom Hook inside your component.
const {
  response: ${camelCasedServiceName}Response,
  error: ${camelCasedServiceName}Error,
  loading: ${camelCasedServiceName}Loading,
  sendDeleteData: ${camelCasedServiceName}PostedData
} = ${name}(
  'sendDeleteData'
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
      {${camelCasedServiceName}Loading && 'Delete ${camelCasedServiceName} Loading...'}
      {${camelCasedServiceName}Error && \`${camelCasedServiceName} Error: \$\{${camelCasedServiceName}Error.message\}\`}
      {${camelCasedServiceName}Response && JSON.stringify(${camelCasedServiceName}Response)}
    </pre>
  </pre>
)
*/
`
}