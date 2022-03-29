module.exports = function createPostServiceFile({ name, serviceName, endpoint, body }) {
  const camelCasedServiceName = serviceName.camelCased

return `import usePost from '../../usePost'
// TODO: below import path should be updated.
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

 // TODO: below import path should be updated.
import ${name} from './path/to/${name}'

// TODO: call this Custom Hook inside your component.
const {
  response: ${camelCasedServiceName}Response,
  error: ${camelCasedServiceName}Error,
  loading: ${camelCasedServiceName}Loading,
  sendPostData: ${camelCasedServiceName}PostedData
} = ${name}(
  'sendPostData'
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
      {${camelCasedServiceName}Loading && 'Post ${camelCasedServiceName} Loading...'}
      {${camelCasedServiceName}Error && \`${camelCasedServiceName} Error: \$\{${camelCasedServiceName}Error.message\}\`}
      {${camelCasedServiceName}Response && JSON.stringify(${camelCasedServiceName}Response)}
    </pre>
  </pre>
)
*/
`
}