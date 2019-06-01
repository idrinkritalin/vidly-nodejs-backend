const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: 4,
    maxlength: 30,
    required: true
  },
  isRated: {
    type: Boolean,
    default: false
  }
})

const Genre = mongoose.model('Genre', genreSchema)

const get = async (sortBy = 'isRated') => {
  const genres = await Genre
    .find()
    .select('-__v')
    .sort({ [`${sortBy}`]: 1 })
  return genres
}

const getOne = async (id) => {
  if (mongoose.Types.ObjectId.isValid(id) === false) {
    return { error: true, message: 'Invalid genre' }
  }

  const genre = await Genre
    .findById(id)
    .select('-__v')
  return genre
}

const create = async (payload) => {
  const genre = new Genre(payload)
  try {
    const result = await genre.save()
    return result
  } catch (ex) {
    return { error: true, message: ex.message }
  }
}

const update = async (id, payload) => {
  if (mongoose.Types.ObjectId.isValid(id) === false) {
    return { error: true, message: 'Invalid genre' }
  }

  const genre = await Genre.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true }
  )
  return genre
}

const del = async (id) => {
  if (mongoose.Types.ObjectId.isValid(id) === false) { return null }

  const genre = await Genre.findByIdAndDelete(id)
  return genre
}

module.exports = Genre
module.exports.get = get
module.exports.getOne = getOne
module.exports.create = create
module.exports.update = update
module.exports.del = del
