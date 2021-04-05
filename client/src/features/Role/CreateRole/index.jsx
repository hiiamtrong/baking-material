import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Container } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import rolesAPI from 'api/roleApi'
import InputField from 'components/InputField'
import notify from 'components/Notify'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import * as Yup from 'yup'
const schema = Yup.object().shape({
  code: Yup.string().required('Code is required'),
  label: Yup.string().required('Label is required'),
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

const CreateRoleForm = () => {
  const classes = useStyles()
  const history = useHistory()
  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    await rolesAPI
      .create(data)
      .then(() => {
        notify.success('Tạo role thành công')
        history.push('/roles')
      })
      .catch((error) => {
        notify.errorFromServer(error)
      })
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create A Role
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <InputField
                autoComplete="code"
                name="code"
                variant="outlined"
                required
                fullWidth
                id="code"
                label="Code"
                autoFocus
                inputRef={register}
                error={errors?.code}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                variant="outlined"
                required
                fullWidth
                id="label"
                label="Label"
                name="label"
                autoComplete="label"
                inputRef={register}
                error={errors?.label}
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
export default CreateRoleForm
