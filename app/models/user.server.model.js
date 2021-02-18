const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { error } = require('../lib/logger')
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: 'Bạn chưa nhập username',
    },
    email: {
      type: String,
      required: 'Bạn chưa nhập email',
      unique: true,
    },
    password: {
      type: String,
      default: '12345678',
    },
    salt: String,
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

UserSchema.pre('save', async function (next) {
  const user = this
  if (!user.updated) {
    const hash = await bcrypt.hash(user.password, 10).catch(error)
    user.password = hash
  }
  next()
})

UserSchema.methods.isValidPassword = async function (password) {
  const user = this
  const compare = await bcrypt.compare(password, user.password)
  return compare
}

UserSchema.index({ username: 1 }, { sparse: true, unique: true })

module.exports = mongoose.model('User', UserSchema)
