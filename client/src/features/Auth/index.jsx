import authAPI from 'api/authApi'
import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading/index.jsx'
import PropTypes from 'prop-types'
function AuthFeature() {
  const [user, setRes] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    async function login({ username, password }) {
      const { user } = await authAPI.login({ username, password })
      setRes(user)
    }

    login({ username: 'trongdev', password: '12345678' })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  return (
    <>
      {Loading(User)({ user, isLoading })}
      {error && <p>{error.message}</p>}
    </>
  )
}

User.propTypes = {
  user: PropTypes.object,
}

function User({ user }) {
  console.log(user)
  return (
    <div>
      {user && <p>{user.username}</p>}
      {user && <p>{user.email}</p>}
    </div>
  )
}

export default AuthFeature
