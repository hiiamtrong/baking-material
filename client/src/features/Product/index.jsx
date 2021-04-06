import React from 'react'
import { Route } from 'react-router'
import CreateProductForm from './CreateProduct'
import ProductList from './ProductList'

function ProductFeature() {
  return (
    <div>
      <Route exact={true} path="/products" component={ProductList}></Route>
      <Route
        exact={true}
        path="/products/create"
        component={CreateProductForm}
      ></Route>
    </div>
  )
}

export default ProductFeature
