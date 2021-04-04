import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Container } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import usersAPI from 'api/usersApi'
import InputField from 'components/InputField'
import notify from 'components/Notify'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import * as Yup from 'yup'
const schema = Yup.object().shape({
  username: Yup.string()
    .max(10, 'Login must be shorter than 10 characters')
    .required('Username is required'),
  email: Yup.string().email('Email invalid').required('Email is required'),
})

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const CreateUserForm = () => {
  const classes = useStyles()
  const history = useHistory()
  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    await usersAPI
      .create(data)
      .then(() => {
        notify.success('Tạo người dùng thành công')
        history.push('/users')
      })
      .catch((error) => {
        notify.errorFromServer(error)
      })
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Create An User
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InputField
                autoComplete="username"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                inputRef={register}
                error={errors?.username}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                variant="outlined"
                required
                fullWidth
                id="displayName"
                label="Display Name"
                name="displayName"
                autoComplete="name"
                inputRef={register}
                error={errors?.displayName}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={register}
                error={errors?.email}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create
          </Button>
        </form>
      </div>
    </Container>
  )
}
export default CreateUserForm
