import AuthFeature from 'features/Auth'
import UserFeature from 'features/User'
import React from 'react'
import { Route } from 'react-router'
import { Link } from 'react-router-dom'

Routes.propTypes = {}

function Routes() {
  return (
    <div>
      <p>
        <Link to="/auth/login">Login</Link>
      </p>
      <p>
        <Link to="/users">Users</Link>
      </p>

      <Route path="/auth/login" component={AuthFeature}></Route>
      <Route path="/users" component={UserFeature}></Route>
    </div>
  )
}

export default Routes
