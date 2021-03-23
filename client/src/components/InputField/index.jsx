import { Container, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  inputRef: PropTypes.any,
  id: PropTypes.string,
  error: PropTypes.any,
}

function InputField({
  name,
  label,
  inputRef,
  type = 'text',
  id,
  error,
  ...props
}) {
  if (!label) {
    label = name
  }
  return (
    <Container>
      <TextField
        name={name}
        type={type}
        label={label}
        inputRef={inputRef}
        id={id}
        error={!!error}
        {...props}
        helperText={!!error && error.message}
      />
    </Container>
  )
}

export default InputField
