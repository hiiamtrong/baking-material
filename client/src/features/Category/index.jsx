import React from 'react'
import { Route } from 'react-router'
import CategoryList from './CategoryList'
import CreateCategoryForm from './CreateCategory'

function CategoryFeature() {
  return (
    <div>
      <Route exact={true} path="/categories" component={CategoryList}></Route>
      <Route
        exact={true}
        path="/categories/create"
        component={CreateCategoryForm}
      ></Route>
    </div>
  )
}

export default CategoryFeature
