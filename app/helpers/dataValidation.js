const Joi = require('joi')

function genre (genre) {
  const schema = {
    name: Joi.string().min(3).max(30).required(),
    isRated: Joi.boolean()
  }
  return Joi.validate(genre, schema)
}

module.exports.genre = genre
