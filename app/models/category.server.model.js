const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const CategorySchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: 'Bạn chưa nhập code',
      unique: 'Role đã tồn tại',
    },
    label: {
      type: String,
      required: 'Bạn chưa nhập label',
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

CategorySchema.plugin(uniqueValidator, {
  message: '{PATH} already exists ',
})
CategorySchema.index({ code: 1 }, { sparse: true, unique: true })

module.exports = mongoose.model('Category', CategorySchema)
