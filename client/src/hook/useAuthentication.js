import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function useAuthentication() {
  const user = useSelector(({ auth }) => auth.user)
  const [isAuthenticated, setAuthenticated] = useState(!!user)
  useEffect(() => {
    setAuthenticated(!!user)
  }, [user])
  return [isAuthenticated, setAuthenticated]
}

export default useAuthentication
