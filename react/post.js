module.exports = function createPostServiceFile ({ name, endpoint }) {
return `import usePost from '../../usePost'

export default function ${name}(methodName) {
  const { response, error, loading, sendPostData } = usePost(
    '${endpoint}',
     methodName
  )
  return { response, error, loading, [methodName]: sendPostData }
}
`
}