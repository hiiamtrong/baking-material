import { Header } from '../components/Header/index.jsx'
import AuthFeature from 'features/Auth'
import UserFeature from 'features/User'
import React from 'react'
import { Route } from 'react-router'

Routes.propTypes = {}

function Routes() {
  return (
    <div>
      <Header></Header>
      <Route path="/auth/login" component={AuthFeature}></Route>
      <Route path="/users" component={UserFeature}></Route>
    </div>
  )
}

export default Routes
