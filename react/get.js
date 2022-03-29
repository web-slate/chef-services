module.exports = function createGetServiceFile ({ name, serviceName, endpoint }) {
const camelCasedServiceName = serviceName.camelCased

return `import useFetch from '../../useFetch'
// TODO: below import path should be updated.
import { ${endpoint} } from '../path/to/utils/endpoints'

export default function ${name}() {
  const { response, error, loading } = useFetch(
    ${endpoint}
  )
  return { response, error, loading }
}

/***
 * Sample Implementation for above Get Services Custom Hook.

 // TODO: below import path should be updated.
import ${name} from './path/to/${name}'

// TODO: call this Custom Hook inside your component.
const {
  response: ${camelCasedServiceName}Response,
  error: ${camelCasedServiceName}Error,
  loading: ${camelCasedServiceName}Loading
} = ${name}()

// TODO: paste this below snippet to test this custom hook.
return (
  <pre>
    {${camelCasedServiceName}Loading && 'Get ${camelCasedServiceName} Loading...'}
    {${camelCasedServiceName}Error && \`${serviceName.default} Error: \$\{${camelCasedServiceName}Error.message\}\`}
    {${camelCasedServiceName}Response && JSON.stringify(${camelCasedServiceName}Response)}
  </pre>
)
*/
`

}