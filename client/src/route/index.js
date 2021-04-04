import PrivateRoute from 'components/PrivateRoute/index.jsx'
import AuthFeature from 'features/Auth'
import UserFeature from 'features/User'
import React from 'react'
import { Header } from '../components/Header/index.jsx'

Routes.propTypes = {}

function Routes() {
  return (
    <div>
      <Header></Header>
      <PrivateRoute path="/auth/login" component={AuthFeature}></PrivateRoute>
      <PrivateRoute path="/users" component={UserFeature}></PrivateRoute>
      <PrivateRoute path="/" component={() => <div>Home</div>} />
      
    </div>
  )
}

export default Routes
