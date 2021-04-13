const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const ProductSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: 'Bạn chưa nhập sku',
      unique: 'sku đã tồn tại',
    },
    price: {
      type: Number,
      required: 'Bạn chưa nhập price',
    },
    salePrice: {
      type: Number,
    },
    description: {
      type: String,
      required: 'Bạn chưa nhập description',
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
    tags: [String],
    images: [
      {
        url: String,
        name: String,
      },
    ],
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

ProductSchema.plugin(uniqueValidator, {
  message: '{PATH} already exists ',
})
ProductSchema.index({ sku: 1 }, { sparse: true, unique: true })

module.exports = mongoose.model('Product', ProductSchema)
