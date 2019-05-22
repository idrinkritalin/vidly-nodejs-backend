const Joi = require('joi')

function genre (genre) {
  const schema = {
    name: Joi.string().min(5).max(30).required(),
    isRated: Joi.boolean()
  }
  return Joi.validate(genre, schema)
}

function customer (customer) {
  const schema = {
    name: Joi.string().min(5).max(30).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().min(5).max(30).required()
  }
  return Joi.validate(customer, schema)
}

module.exports.genre = genre
module.exports.customer = customer
