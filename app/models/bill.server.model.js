const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const BillSchema = new mongoose.Schema(
  {
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
        },
      },
    ],

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: 'Hóa đơn chưa có thông tin khách hàng',
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

    voucher: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
)

BillSchema.plugin(uniqueValidator, {
  message: '{PATH} already exists ',
})

module.exports = mongoose.model('Bill', BillSchema)
