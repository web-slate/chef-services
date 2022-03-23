module.exports = function createGetServiceFile ({ name, endpoint }) {
return `import useFetch from '../../useFetch'

export default function ${name}() {
  const { response, error, loading } = useFetch(
    '${endpoint}'
  )
  return { response, error, loading }
}
`
}