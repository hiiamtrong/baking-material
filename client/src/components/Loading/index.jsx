import React from 'react'
import PropTypes from 'prop-types'
import { Eclipse } from 'react-loading-io'

function Loading(LoadingComponent) {
  WrapComponent.propTypes = {
    isLoading: PropTypes.bool.isRequired,
  }
  function WrapComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <Eclipse size={64} />
    }
    return <LoadingComponent {...props} />
  }
  return WrapComponent
}

export default Loading
