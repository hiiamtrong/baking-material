const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')
const { error } = require('../lib/logger')
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: 'Bạn chưa nhập username',
      unique: 'Username đã tồn tại',
    },
    displayName: {
      type: String,
      required: 'Bạn chưa nhập display name',
    },
    email: {
      type: String,
      required: 'Bạn chưa nhập email',
      unique: 'Email đã tồn tại',
    },
    password: {
      type: String,
      default: '12345678',
    },
    salt: String,
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
    refreshToken: String,
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
UserSchema.plugin(uniqueValidator, {
  message: '{PATH} already exists ',
})
UserSchema.index({ username: 1, emai: 1 }, { sparse: true, unique: true })

module.exports = mongoose.model('User', UserSchema)
