const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const CustomerSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: 'Bạn chưa nhập phone number',
      unique: 'phone number đã tồn tại',
    },
    displayName: {
      type: String,
      required: 'Bạn chưa nhập họ tên',
    },
    address: {
      type: String,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    created: {
      type: Date,
      default: Date.now(),
    },
    updated: {
      type: Date,
    },
  },
  { timestamps: true }
)

CustomerSchema.plugin(uniqueValidator, {
  message: '{PATH} already exists ',
})
CustomerSchema.index({ phoneNumber: 1 }, { sparse: true, unique: true })

module.exports = mongoose.model('Customer', CustomerSchema)
