import React from 'react'
import PropTypes from 'prop-types'
import { FormControlLabel, Checkbox } from '@material-ui/core'
import { Controller } from 'react-hook-form'
FormCheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  register: PropTypes.any,
  control: PropTypes.any,
  label: PropTypes.string,
}

export function FormCheckBox({ name, value, register, control, label }) {
  return (
    <FormControlLabel
      value={value}
      control={
        <Controller
          as={<Checkbox />}
          name={name}
          type="checkbox"
          value={value}
          inputRef={register}
          control={control}
        />
      }
      label={label}
    />
  )
}
