import React, { useState } from 'react'
import PropTypes from 'prop-types'
import authAPI from 'api/authApi'
// import Loading from '../../../components/Loading/index.jsx'
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setLoading: PropTypes.func,
}

function LoginForm({ handleLogin, setLoading }) {
  const [credentials, setCredentials] = useState({})
  //   const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const handleOnSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    handleLogin(credentials)
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const handleOnChange = (e) => {
    setCredentials((prev) => {
      const current = { ...prev }
      current[e.target.name] = e.target.value
      return current
    })
  }
  const handleRefreshToken = async (e) => {
    e.preventDefault()
    const user = await authAPI.refreshToken()
    console.log(user)
  }

  return (
    <>
      <form>
        <input name="username" onChange={(e) => handleOnChange(e)} />
        <br />
        <input name="password" onChange={(e) => handleOnChange(e)} />
        <br />
        <button
          onClick={(e) => {
            handleOnSubmit(e)
          }}
        >
          Login
        </button>
        <button
          onClick={(e) => {
            handleRefreshToken(e)
          }}
        >
          Refresh Token
        </button>
      </form>
      {/* {Loading(User)({ user, isLoading })} */}
      {error && <p>{error.message}</p>}
    </>
  )
}

export default LoginForm
