import RootContext from 'context'
import { useContext } from 'react'

function useAuthentication() {
  const { authenticationStore } = useContext(RootContext)
  return authenticationStore.isAuthenticated
}

export default useAuthentication
