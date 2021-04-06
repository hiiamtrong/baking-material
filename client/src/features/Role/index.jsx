import React from 'react'
import { Route } from 'react-router'
import CreateRoleForm from './CreateRole'
import RoleList from './RoleList'

function RoleFeature() {
  return (
    <div>
      <Route exact={true} path="/roles" component={RoleList}></Route>
      <Route
        exact={true}
        path="/roles/create"
        component={CreateRoleForm}
      ></Route>
    </div>
  )
}

export default RoleFeature
