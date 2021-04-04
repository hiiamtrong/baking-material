import React from 'react'
import PropTypes from 'prop-types'
import useAuthentication from 'hook/useAuthentication'
import { Redirect, Route } from 'react-router'

PrivateRoute.propTypes = {
  component: PropTypes.any,
}

function PrivateRoute({ component, ...props }) {
  const isAuthenticated = useAuthentication()
  if (isAuthenticated) {
    return <Route {...props} component={component} />
  }
  return <Redirect to="/auth/login" />
}

export default PrivateRoute
