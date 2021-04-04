import React from 'react'
import PropTypes from 'prop-types'
import { Eclipse } from 'react-loading-io'

function Loading(LoadingComponent) {
  WrapComponent.propTypes = {
    isLoading: PropTypes.bool.isRequired,
  }
  function WrapComponent({ isLoading, ...props }) {
    if (isLoading) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Eclipse size={64} color="black" />
          <p>Đang tải...</p>
        </div>
      )
    }
    return <LoadingComponent {...props} />
  }
  return WrapComponent
}

export default Loading
