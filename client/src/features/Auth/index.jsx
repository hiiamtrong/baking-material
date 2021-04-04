import { unwrapResult } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash-es'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import Loading from '../../components/Loading/index.jsx'
import notify from '../../components/Notify/index'
import { login } from './authSlice'
import LoginForm from './Login/index.jsx'

function AuthFeature() {
  const dispatch = useDispatch()
  const { isLoading, user } = useSelector(({ auth }) => auth)
  const handleLogin = async (credentials) => {
    const action = login(credentials)
    const resultAction = await dispatch(action)
    unwrapResult(resultAction)
    notify.success('Đăng nhập thành công')
  }

  if (!isEmpty(user)) {
    return <Redirect to="/home" />
  }

  return <div>{Loading(LoginForm)({ isLoading, handleLogin })}</div>
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
