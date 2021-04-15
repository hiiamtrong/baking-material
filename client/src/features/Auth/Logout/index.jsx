import RootContext from 'context'
import { useContext, useEffect } from 'react'
import { useHistory } from 'react-router'

function Logout() {
  const { authenticationStore } = useContext(RootContext)
  const { logout } = authenticationStore
  const history = useHistory()
  useEffect(() => {
    logout()
    history.push('/auth/login')
  }, [])
  return null
}

export default Logout
