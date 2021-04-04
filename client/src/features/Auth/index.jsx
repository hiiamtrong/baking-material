import RootContext from 'context.js'
import { observer } from 'mobx-react-lite'
import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { Redirect } from 'react-router'
import Loading from '../../components/Loading/index.jsx'
import notify from '../../components/Notify/index'
import LoginForm from './Login/index.jsx'

const AuthFeature = observer(() => {
  const { authenticationStore } = useContext(RootContext)
  const { login, isAuthenticated, isLoading } = authenticationStore
  const handleLogin = async (credentials) => {
    await login(credentials)
      .then(() => {
        notify.success('Đăng nhập thành công')
      })
      .catch((err) => {
        notify.errorFromServer(err)
      })
  }

  if (isAuthenticated) {
    return <Redirect to="/home" />
  }

  return <div>{Loading(LoginForm)({ isLoading, handleLogin })}</div>
})
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
