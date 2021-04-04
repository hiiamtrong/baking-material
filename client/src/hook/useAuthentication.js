import { isEmpty } from 'lodash-es'
import { useSelector } from 'react-redux'

function useAuthentication() {
  const user = useSelector(({ auth }) => auth.user)
  return !isEmpty(user)
}

export default useAuthentication
