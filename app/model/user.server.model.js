const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: 'Bạn chưa nhập username',
    },
    password: {
      type: String,
      default: '12345678',
    },
    hash: String,
    displayName: String,
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
    roles: [String],
  },
  { timestamps: true }
)

userSchema.methods.hashPassword = async function () {
  const saltRounds = 10
  this.hash = await bcrypt.hash(this.password, saltRounds)
}
userSchema.index({ username: 1 }, { sparse: true, unique: true })

module.exports = mongoose.model('User', userSchema)
