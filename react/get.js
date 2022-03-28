module.exports = function createGetServiceFile ({ name, serviceName, endpoint }) {
const camelCasedServiceName = serviceName.camelCased

return `import useFetch from '../../useFetch'

export default function ${name}() {
  const { response, error, loading } = useFetch(
    '${endpoint}'
  )
  return { response, error, loading }
}

/***
 * Sample Implementation for above Get Services Custom Hook.

// Services
import ${name} from './path/to/${name}'

const { response: ${camelCasedServiceName}Response, error: ${camelCasedServiceName}Error, loading: ${camelCasedServiceName}Loading } = ${name}()

// Inside Component.
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