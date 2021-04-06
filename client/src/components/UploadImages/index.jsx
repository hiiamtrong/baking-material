import {
  Box,
  Button,
  ListItem,
  Typography,
  withStyles,
} from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import notify from 'components/Notify'
import React, { useState } from 'react'
import UploadService from '../../services/upload-files.service'
import PropTypes from 'prop-types'
const BorderLinearProgress = withStyles(() => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: '#EEEEEE',
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress)

UploadImages.propTypes = {
  handleUploadImages: PropTypes.func.isRequired,
}

export function UploadImages({ handleUploadImages }) {
  const [currentFile, setCurrentFile] = useState(undefined)
  const [previewImage, setPreviewImage] = useState(undefined)
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [imageInfos, setImageInfos] = useState([])

  const selectFile = (e) => {
    if (e.target.files[0]) {
      setCurrentFile(e.target.files[0])
      setPreviewImage(URL.createObjectURL(e.target.files[0]))

      setProgress(0), setMessage('')
    }
  }

  const upload = () => {
    setProgress(0)
    UploadService.upload(currentFile, (e) => {
      setProgress(Math.round((100 * e.loaded) / e.total))
    })
      .then(({ file, message }) => {
        setMessage(message)
        setImageInfos((state) => {
          return [...state, file]
        })
        handleUploadImages(file)
        setIsError(false)
      })
      .catch((err) => {
        notify.errorFromServer(err)
        setProgress(0)
        setMessage('Could not upload the image!')
        setCurrentFile(undefined)
        setIsError(true)
      })
  }

  return (
    <div className="mg20">
      <label htmlFor="btn-upload">
        <input
          id="btn-upload"
          name="btn-upload"
          style={{ display: 'none' }}
          type="file"
          accept="image/*"
          onChange={selectFile}
        />
        <Button className="btn-choose" variant="outlined" component="span">
          Choose Image
        </Button>
      </label>
      <div className="file-name">{currentFile ? currentFile.name : null}</div>
      <Button
        className="btn-upload"
        color="primary"
        variant="contained"
        component="span"
        disabled={!currentFile}
        onClick={upload}
      >
        Upload
      </Button>

      {currentFile && (
        <Box className="my20" display="flex" alignItems="center">
          <Box width="100%" mr={1}>
            <BorderLinearProgress variant="determinate" value={progress} />
          </Box>
          <Box minWidth={35}>
            <Typography
              variant="body2"
              color="textSecondary"
            >{`${progress}%`}</Typography>
          </Box>
        </Box>
      )}

      {previewImage && (
        <div>
          <img
            className="preview my20"
            src={previewImage}
            width="400px"
            alt=""
          />
        </div>
      )}

      {message && (
        <Typography
          variant="subtitle2"
          className={`upload-message ${isError ? 'error' : ''}`}
        >
          {message}
        </Typography>
      )}

      <Typography variant="h6" className="list-header">
        List of Images
      </Typography>
      <ul className="list-group">
        {imageInfos &&
          imageInfos.map((image, index) => (
            <ListItem divider key={index}>
              <img
                src={image.url}
                alt={image.name}
                height="80px"
                width="80px"
                className="mr20"
              />
              <a href={image.url}>{image.name}</a>
            </ListItem>
          ))}
      </ul>
    </div>
  )
}
