module.exports = function createDeleteServiceFile ({ name, serviceName, endpoint, body }) {
const camelCasedServiceName = serviceName.camelCased

return `import useDelete from '../../useDelete'

export default function ${name}(methodName) {
  const { response, error, loading, sendDeleteData } = useDelete(
    ${endpoint},
     methodName
  )
  return { response, error, loading, [methodName]: sendDeleteData }
}

/***
 * Sample Implementation for above Delete Services Custom Hook.

// Services
import ${name} from './path/to/${name}'

// Inside your component.
const {
  response: ${camelCasedServiceName}Response,
  error: ${camelCasedServiceName}Error,
  loading: ${camelCasedServiceName}Loading,
  sendDeleteData: ${camelCasedServiceName}PostedData
} = ${name}(
  'sendDeleteData'
)

const ${camelCasedServiceName}Payload = ${body}

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