import { Button } from '@material-ui/core'
import InputField from 'components/InputField'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import usersAPI from 'api/usersApi'
import notify from 'components/Notify'
const schema = Yup.object().shape({
  username: Yup.string()
    .max(10, 'Login must be shorter than 10 characters')
    .required('Username is required'),
  email: Yup.string().email('Email invalid').required('Email is required'),
  displayName: Yup.string().required('Display name is required'),
})
const CreateUserForm = () => {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    const user = await usersAPI.create(data).catch((error) => {
      notify.errorFromServer(error)
    })
    console.log(user)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        id="username"
        name="username"
        label="Username"
        inputRef={register}
        error={errors.username}
      />
      <InputField
        id="email"
        name="email"
        label="Enail"
        inputRef={register}
        error={errors.email}
      />
      <InputField
        id="displayName"
        name="displayName"
        label="Display name"
        inputRef={register}
        error={errors.displayName}
      />
      <InputField type="file" id="avatar" name="avatar"  />
      <Button type="submit" color="default">
        Create
      </Button>
    </form>
  )
}
export default CreateUserForm
