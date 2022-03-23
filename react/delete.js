module.exports = function createDeleteServiceFile ({ name, endpoint }) {
return `import useDelete from '../../useDelete'

export default function ${name}(methodName) {
  const { response, error, loading, sendDeleteData } = useDelete(
    ${endpoint},
     methodName
  )
  return { response, error, loading, [methodName]: sendDeleteData }
}
`
}