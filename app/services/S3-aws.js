const AWS = require('aws-sdk')
const logger = require('../lib/logger')
const sharp = require('sharp')
var dayjs = require('../lib/day')

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
})

const createBucket = async function (bucketName, region) {
  const params = {
    Bucket: bucketName || process.env.S3_BUCKET_NAME,
    CreateBucketConfiguration: {
      LocationConstraint: region || process.env.AWS_REGION,
    },
  }
  s3.createBucket(params, function (err, data) {
    if (err) {
      logger.error(err)
    } else console.log('Bucket Created Successfully', data.Location)
  })
}
const uploadImage = async function ({
  bucketName = process.env.S3_BUCKET_NAME,
  data,
  folderName,
  name,
  time,
}) {
  // Setting up S3 upload parameters
  const params = {
    Bucket: bucketName,
    Key: `${folderName}/${time}_${name}`, // File name you want to save as in S3
    Body: data,
    ACL: 'public-read',
  }

  // Uploading files to the bucket

  const uploadedFile = s3.upload(params, (err, data) => {
    if (err) {
      return logger.error(err)
    }
    console.log(`File uploaded successfully. ${data.Location}`)
  })
  return uploadedFile
}

const asyncMiddleware = require('../middlewares/async-middleware')
const { Error } = require('mongoose')
const handleUploadImages = asyncMiddleware(async (req, res) => {
  const { file } = req.files
  if (!file) {
    throw new Error('File not found')
  }

  const { data, name } = file
  const resizedImage = await resizeImage(data)
  const { auth } = req
  const time = dayjs().format('YYYY_MM_DD_hh_mm')
  await uploadImage({
    data: resizedImage,
    folderName: auth.username,
    name,
    time,
  })
  const src = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${auth.username}/${time}_${name}`
  const _file = {
    src,
    name,
  }
  res.jsonp({ file: _file, message: 'Upload thành công' })
})

async function resizeImage(bufferData) {
  let resizeImage = await sharp(bufferData).resize(256, 256).toBuffer()
  return resizeImage
}

module.exports = {
  createBucket,
  uploadImage,
  handleUploadImages,
  resizeImage,
}
