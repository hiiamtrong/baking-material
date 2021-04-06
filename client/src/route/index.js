import PrivateRoute from 'components/PrivateRoute/index.jsx'
import AuthFeature from 'features/Auth'
import RoleFeature from 'features/Role/index.jsx'
import UserFeature from 'features/User'
import React from 'react'
import { Route } from 'react-router'
import { Header } from '../components/Header/index.jsx'

Routes.propTypes = {}

function Routes() {
  return (
    <div>
      <Header></Header>
      <Route exact path="/auth/login" component={AuthFeature}></Route>
      <PrivateRoute path="/users" component={UserFeature}></PrivateRoute>
      <PrivateRoute path="/roles" component={RoleFeature}></PrivateRoute>
      <PrivateRoute
        exact
        path="/home"
        component={() => (
          <div>
            <h1>Home</h1>
          </div>
        )}
      />
    </div>
  )
}

export default Routes
