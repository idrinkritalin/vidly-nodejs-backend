const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

// REQUEST GENRE
function genre (genre) {
  const schema = {
    name: Joi.string().min(4).max(30).required(),
    isRated: Joi.boolean()
  }
  return Joi.validate(genre, schema)
}

function updateGenre (genre) {
  const schema = {
    name: Joi.string().min(4).max(30),
    isRated: Joi.boolean()
  }
  return Joi.validate(genre, schema)
}

// REQUEST CUSTOMER
function customer (customer) {
  const schema = {
    name: Joi.string().min(4).max(30).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().min(10).max(30).required()
  }
  return Joi.validate(customer, schema)
}

function updateCustomer (customer) {
  const schema = {
    name: Joi.string().min(4).max(30),
    isGold: Joi.boolean(),
    phone: Joi.string().min(10).max(30)
  }
  return Joi.validate(customer, schema)
}

// REQUEST MOVIE
function movie (movie) {
  const schema = {
    title: Joi.string().min(4).max(30).required(),
    genre: Joi.objectId().required(),
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number()
  }
  return Joi.validate(movie, schema)
}

function updateMovie (movie) {
  const schema = {
    title: Joi.string().min(4).max(30),
    genre: Joi.objectId(),
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number()
  }
  return Joi.validate(movie, schema)
}

// REQUEST RENTAL
function rental (rental) {
  const schema = {
    customer: Joi.objectId().required(),
    movie: Joi.objectId().required()
  }
  return Joi.validate(rental, schema)
}

// REQUEST USER
function user (user) {
  const schema = {
    name: Joi.string().min(5).max(35).required(),
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(1024).required()
  }

  return Joi.validate(user, schema)
}

// REQUEST AUTH
function auth (req) {
  const schema = {
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(1024).required()
  }

  return Joi.validate(req, schema)
}

module.exports.genre = genre
module.exports.updateGenre = updateGenre

module.exports.customer = customer
module.exports.updateCustomer = updateCustomer

module.exports.movie = movie
module.exports.updateMovie = updateMovie

module.exports.rental = rental

module.exports.user = user

module.exports.auth = auth
