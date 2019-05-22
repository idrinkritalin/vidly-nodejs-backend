const mongoose = require('mongoose')

const customersSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 30,
    required: true
  },
  isGold: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    minlength: 5,
    maxlength: 30,
    required: true
  }
})

const Customer = mongoose.model('Customer', customersSchema)

const get = async (sortBy) => {
  const customer = await Customer
    .find()
    .sort({ [`${sortBy}`]: 1 })
  return customer
}

const getOne = async (id) => {
  if (mongoose.Types.ObjectId.isValid(id) === false) {
    return null
  }
  const customer = await Customer.findById(id)
  return customer
}

const create = async (payload) => {
  const customer = new Customer(payload)

  try {
    const result = await customer.save()
    return result
  } catch (ex) {
    return ex.message
  }
}

const update = async (id, payload) => {
  if (mongoose.Types.ObjectId.isValid(id) === false) {
    return null
  }
  const customer = await Customer.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true }
  )
  return customer
}

const del = async (id) => {
  if (mongoose.Types.ObjectId.isValid(id) === false) {
    return null
  }
  const customer = await Customer.findByIdAndDelete(id)
  return customer
}

module.exports.get = get
module.exports.getOne = getOne
module.exports.create = create
module.exports.update = update
module.exports.del = del
