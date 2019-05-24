const mongoose = require('mongoose')
const Genre = require('./genres')

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    minlength: 4,
    maxlength: 30,
    required: true
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre',
    required: true
  },
  numberInStock: {
    type: Number,
    default: 0,
    min: 0,
    max: 300
  },
  dailyRentalRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 300
  }
})

const Movie = mongoose.model('Movie', movieSchema)

const get = async (sortBy = 'title') => {
  const movie = await Movie
    .find()
    .select('-__v')
    .populate('genre', 'name isRated -_id')
    .sort({ [`${sortBy}`]: 1 })
  return movie
}

const getOne = async (id) => {
  if (mongoose.Types.ObjectId.isValid(id) === false) {
    return { error: true, message: 'Invalid movie' }
  }

  const movie = await Movie
    .findById(id)
    .select('-__v')
    .populate('genre', 'name isRated -_id')
  return movie
}

const create = async (payload) => {
  if (mongoose.Types.ObjectId.isValid(payload.genre) === false) {
    return { error: true, message: 'Invalid genre' }
  }
  const genre = await Genre.findById(payload.genre)
  if (!genre) return { error: true, message: 'Invalid genre' }

  const movie = new Movie(payload)
  try {
    const result = await movie.save()
    return result
  } catch (ex) {
    return ex.message
  }
}

const update = async (id, payload) => {
  console.log(payload)
  if (mongoose.Types.ObjectId.isValid(id) === false) {
    return { error: true, message: 'Invalid movie' }
  }
  if (payload.genre !== undefined) {
    if (mongoose.Types.ObjectId.isValid(payload.genre) === false) {
      return { error: true, message: 'Invalid genre' }
    }
    const genre = await Genre.findById(payload.genre)
    if (!genre) return { error: true, message: 'Invalid genre' }
  }

  const movie = await Movie.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true }
  )
  return movie
}

const del = async (id) => {
  if (mongoose.Types.ObjectId.isValid(id) === false) { return null }

  const movie = await Movie.findByIdAndDelete(id)
  return movie
}

module.exports = Movie
module.exports.get = get
module.exports.getOne = getOne
module.exports.create = create
module.exports.update = update
module.exports.del = del
