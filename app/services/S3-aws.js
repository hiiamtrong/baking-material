const AWS = require('aws-sdk')
const logger = require('../lib/logger')
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
})

const createBucket = async function (bucketName, region) {
  const params = {
    Bucket: bucketName || process.env.S3_BUCKET_NAME,
    CreateBucketConfiguration: {
      // Set your region here
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
}) {
  // Setting up S3 upload parameters
  const params = {
    Bucket: bucketName,
    Key: `${folderName}/${name}`, // File name you want to save as in S3
    Body: data,
  }

  // Uploading files to the bucket
  s3.upload(params, function (err, data) {
    if (err) {
      logger.error(err)
    }
    console.log(`File uploaded successfully. ${data.Location}`)
  })
}
module.exports = {
  createBucket,
  uploadImage,
}
