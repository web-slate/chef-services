module.exports = function createPostServiceFile({ name, serviceName, endpoint, body }) {
  const camelCasedServiceName = serviceName.camelCased

return `import usePost from '../../usePost'
import { ${endpoint} } from '../path/to/utils/endpoints'

export default function ${name}(methodName) {
  const { response, error, loading, sendPostData } = usePost(
    ${endpoint},
    methodName
  )
  return { response, error, loading, [methodName]: sendPostData }
}

/***
 * Sample Implementation for above Post Services Custom Hook.

// Services
import ${name} from './path/to/${name}'

// Inside your component.
const {
  response: ${camelCasedServiceName}Response,
  error: ${camelCasedServiceName}Error,
  loading: ${camelCasedServiceName}Loading,
  sendPostData: ${camelCasedServiceName}PostedData
} = ${name}(
  'sendPostData'
)

const ${camelCasedServiceName}Payload = ${body}

return (
  <pre>
    <pre>{JSON.stringify(${camelCasedServiceName}Payload)}</pre>
    <div><button type="button" onClick={()=>{${camelCasedServiceName}PostedData(${camelCasedServiceName}Payload)}}>${serviceName.default}</button></div>
    <div>Response:</div>
    <pre>
      {${camelCasedServiceName}Loading && 'Post ${camelCasedServiceName} Loading...'}
      {${camelCasedServiceName}Error && \`${camelCasedServiceName} Error: \$\{${camelCasedServiceName}Error.message\}\`}
      {${camelCasedServiceName}Response && JSON.stringify(${camelCasedServiceName}Response)}
    </pre>
  </pre>
)
*/
`
}