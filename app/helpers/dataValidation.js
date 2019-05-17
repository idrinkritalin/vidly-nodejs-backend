const Joi = require('joi')

function genre (genre) {
  const schema = {
    name: Joi.string().min(3).required(),
    isRated: Joi.boolean().required()
  }
  return Joi.validate(genre, schema)
}

module.exports.genre = genre
