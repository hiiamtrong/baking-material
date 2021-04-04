import { unwrapResult } from '@reduxjs/toolkit'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Loading from '../../components/Loading/index.jsx'
import notify from '../../components/Notify/index'
import { login } from './authSlice'
import LoginForm from './Login/index.jsx'

function AuthFeature() {
  useEffect(() => {
    return setLoading()
  })

  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState()
  const handleLogin = async (credentials) => {
    try {
      setLoading(true)
      const action = login(credentials)
      const resultAction = await dispatch(action)
      unwrapResult(resultAction)
      notify.success('Đăng nhập thành công')
    } catch (error) {
      notify.errorFromServer(error)
    } finally {
      setLoading(false)
    }
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
