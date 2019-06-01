const mongoose = require('mongoose')
const Movie = require('./movies')
const Customer = require('./customers')
const Fawn = require('fawn')

Fawn.init(mongoose)

const rentalSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateReturned: {
    type: Date
  },
  rentalFee: {
    type: Number,
    min: 0
  }
})

const Rental = mongoose.model('Rental', rentalSchema)

const get = async (sortBy = 'dateOut') => {
  const rental = await Rental
    .find()
    .select('-__v')
    .populate('customer movie', '-_id -__v')
    .sort({ [`${sortBy}`]: -1 })
  return rental
}

const getOne = async (id) => {
  if (mongoose.Types.ObjectId.isValid(id) === false) {
    return { error: true, message: 'Invalid rental' }
  }

  const rental = await Rental
    .findById(id)
    .select('-__v')
    .populate('customer movie', '-_id -__v')
  return rental
}

const create = async (payload) => {
  if (mongoose.Types.ObjectId.isValid(payload.movie) === false) {
    return { error: true, message: 'Invalid movie' }
  }
  const movie = await Movie.findById(payload.movie)
  if (!movie) return { error: true, message: 'Invalid movie' }

  if (mongoose.Types.ObjectId.isValid(payload.customer) === false) {
    return { error: true, message: 'Invalid customer' }
  }
  const customer = await Customer.findById(payload.customer)
  if (!customer) return { error: true, message: 'Invalid customer' }

  if (movie.numberInStock === 0) {
    return { error: true, message: 'No movies in stock!' }
  }

  try {
    const rental = new Rental(payload)
    new Fawn.Task()
      .save('rentals', rental)
      .update('movies', { _id: movie._id }, {
        $inc: { numberInStock: -1 }
      })
      .run()
    return rental
  } catch (ex) {
    return { error: true, message: ex.message }
  }
}

module.exports.get = get
module.exports.getOne = getOne
module.exports.create = create
