const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 35
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  }
})

const User = mongoose.model('User', userSchema)

const create = async (payload) => {
  let user = await User.findOne({ name: payload.name })
  if (user) return { error: true, message: 'User already registered' }

  const salt = await bcrypt.genSalt(10)
  user = new User({
    name: payload.name,
    email: payload.email,
    password: await bcrypt.hash(payload.password, salt)
  })

  const token = jwt.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY)

  try {
    const result = await user.save()
    return { result, token }
  } catch (ex) {
    return { error: true, message: ex.message }
  }
}

module.exports = User
module.exports.create = create
