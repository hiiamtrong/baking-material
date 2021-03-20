const asyncMiddleware = require('../middlewares/async-middleware')
const { uploadImage } = require('../services/S3-aws')
const fs = require('fs')

const handleUploadImages = asyncMiddleware(async (req, res) => {
  const fileData = await fs.readFileSync(
    'public/images/g-saeb-divan-saeb-takbeit-sh1343-0.8354399955697807.png'
  )
  console.log(fileData)
  await uploadImage({ data: fileData, folderName: 'trongdev', name: 'cat.png' })
  res.jsonp({ message: 'here' })
})

module.exports = {
  handleUploadImages,
}
