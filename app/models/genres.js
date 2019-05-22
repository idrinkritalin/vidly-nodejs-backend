const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    minlength: 5,
    maxlength: 30,
    required: true
  },
  isRated: Boolean
})

const Genre = mongoose.model('Genre', genreSchema)

const get = async (sortBy = 'id') => {
  const genres = await Genre
    .find()
    .sort({ [`${sortBy}`]: 1 })
  return genres
}

const create = async (payload) => {
  const genre = new Genre(payload)

  try {
    const result = await genre.save()
    return result
  } catch (ex) {
    return ex.message
  }
}

const update = async (id, payload) => {
  const genre = await Genre.findOneAndUpdate(
    { 'id': id },
    { $set: payload },
    { new: true }
  )
  return genre
}

const del = async (id) => {
  const genre = await Genre.findOneAndDelete({ 'id': id })
  console.error(genre)
  return genre
}

module.exports.get = get
module.exports.create = create
module.exports.update = update
module.exports.del = del
