const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
function salePercentValidation(salePersent) {
  if (salePersent <= 0 || salePersent > 100) {
    throw new Error('Sale persent phải > 0 và <= 100')
  }
}

const VoucherSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: 'Bạn chưa nhập code',
      unique: 'Code đã tồn tại',
    },
    salePercent: {
      type: Number,
      required: 'Bạn chưa nhập sale percent',
      validate: salePercentValidation,
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

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    updated: {
      type: Date,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

VoucherSchema.plugin(uniqueValidator, {
  message: '{PATH} already exists ',
})
VoucherSchema.index({ code: 1 }, { sparse: true, unique: true })

module.exports = mongoose.model('Voucher', VoucherSchema)
