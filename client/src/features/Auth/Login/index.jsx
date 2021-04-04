import { yupResolver } from '@hookform/resolvers/yup'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import InputField from 'components/InputField'
import PropTypes from 'prop-types'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const schema = Yup.object().shape({
  username: Yup.string()
    .max(20, 'Tài khoản đăng nhập phải ngắn hơn 20 kí tự')
    .required('Tên tài khoản là bắt buộc'),
  password: Yup.string().required('Mật khẩu là bắt buộc'),
})

function LoginForm({ handleLogin }) {
  const classes = useStyles()
  const methods = useForm({
    resolver: yupResolver(schema),
  })
  const { register, handleSubmit, errors } = methods
  const onSubmit = async (credentials) => {
    handleLogin(credentials)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            autoFocus
            inputRef={register}
            error={errors?.username}
          />
          <InputField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register}
            error={errors?.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default LoginForm
