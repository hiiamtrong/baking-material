import authAPI from 'api/authApi'
import React, { useState } from 'react'
import Loading from '../../components/Loading/index.jsx'
import PropTypes from 'prop-types'
import LoginForm from './Login/index.jsx'
function AuthFeature() {
  const [user, setUser] = useState()
  const [isLoading, setLoading] = useState()
  const handleLogin = async ({ password, username }) => {
    const user = await authAPI.login({ username, password })
    setUser(user)
  }

  return (
    <>
      {!user && <LoginForm handleLogin={handleLogin} setLoading={setLoading} />}
      {Loading(User)({ user, isLoading })}
    </>
  )
}
User.propTypes = {
  user: PropTypes.object,
}

function User({ user }) {
  return (
    <div>
      {user && <p>{user.username}</p>}
      {user && <p>{user.email}</p>}
    </div>
  )
}
export default AuthFeature
