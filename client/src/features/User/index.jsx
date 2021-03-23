import React from 'react'
import { Route } from 'react-router'
import CreateUserForm from './CreateUser'
import UserList from './UserList'

function UserFeature() {
  return (
    <div>
      <Route exact={true} path="/users" component={UserList}></Route>
      <Route
        exact={true}
        path="/users/create"
        component={CreateUserForm}
      ></Route>
    </div>
  )
}

export default UserFeature
