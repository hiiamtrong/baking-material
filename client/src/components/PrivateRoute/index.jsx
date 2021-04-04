import React from 'react'
import PropTypes from 'prop-types'
import useAuthentication from 'hook/useAuthentication'
import { Redirect, Route } from 'react-router'
import { observer } from 'mobx-react-lite'

const PrivateRoute = observer(({ component, ...props }) => {
  const isAuthenticated = useAuthentication()
  if (isAuthenticated) {
    return <Route {...props} component={component} />
  }
  return <Redirect to="/auth/login" />
})
PrivateRoute.propTypes = {
  component: PropTypes.any,
}

export default PrivateRoute
