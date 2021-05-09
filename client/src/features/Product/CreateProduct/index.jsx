import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormLabel,
} from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import productAPI from 'api/productApi'
import InputField from 'components/InputField'
import notify from 'components/Notify'
import { UploadImages } from 'components/UploadImages'
import { useCategory } from 'hook/useCategory'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  sku: Yup.string()
    .matches(/^B\d{4}/, {
      message: 'Sku format is first letter is "B" and 4 number ',
    })
    .required('Sku is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required'),
  categories: Yup.array(),
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

const CreateProductForm = () => {
  const classes = useStyles()
  const history = useHistory()
  const [categories] = useCategory()

  const [images, setImages] = useState([])
  const [checkedValues, setCheckedValues] = useState([])

  function handleSelect(checkedCategory) {
    const newNames = checkedValues?.includes(checkedCategory)
      ? checkedValues?.filter((role) => role !== checkedCategory)
      : [...(checkedValues ?? []), checkedCategory]
    setCheckedValues(newNames)

    return newNames
  }

  const handleUploadImages = (image) => {
    setImages((state) => {
      return [...state, image]
    })
  }

  const { register, handleSubmit, errors, control } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: {
      categories: [],
    },
  })

  const onSubmit = async (data) => {
    data.images = images
    await productAPI
      .create(data)
      .then(() => {
        notify.success('Tạo sản phẩm thành công')
        history.push('/products')
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
          Create A Product
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InputField
                autoComplete="sku"
                name="sku"
                variant="outlined"
                required
                fullWidth
                id="sku"
                label="SKU"
                autoFocus
                inputRef={register}
                error={errors?.sku}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                type="number"
                variant="outlined"
                required
                fullWidth
                id="price"
                label="Price"
                name="price"
                inputRef={register}
                error={errors?.price}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                inputRef={register}
                error={errors?.description}
              />
            </Grid>

            <Grid style={{ overflow: 'auto', height: '200px ' }}>
              <FormLabel>Categories </FormLabel>

              {categories.map((role) => (
                <FormControlLabel
                  control={
                    <Controller
                      name="categories"
                      render={({ onChange: onCheckChange }) => {
                        return (
                          <Checkbox
                            checked={checkedValues.includes(role._id)}
                            onChange={() =>
                              onCheckChange(handleSelect(role._id))
                            }
                          />
                        )
                      }}
                      control={control}
                    />
                  }
                  key={role._id}
                  label={role.label}
                />
              ))}
            </Grid>

            <Grid item xs={12}>
              <UploadImages handleUploadImages={handleUploadImages} />
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
export default CreateProductForm
