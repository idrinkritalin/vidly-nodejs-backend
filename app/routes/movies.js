const express = require('express')
const router = express.Router()
const movies = require('../models/movies')
const validate = require('../helpers/dataValidation')

// GET
router.get('/', async (req, res) => {
  const request = await movies.get(req.query.sortBy)
  res.send(request)
})

router.get('/:id', async (req, res) => {
  const movie = await movies.getOne(req.params.id)
  movie.error ? res.status(400).send(movie.message) : res.send(movie)
})

// POST
router.post('/', async (req, res) => {
  const request = validate.movie(req.body)
  if (request.error !== null) return res.status(400).send(request.error.details[0].message)

  const movie = {
    title: req.body.title,
    genre: req.body.genre,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  }

  const result = await movies.create(movie)
  result.error ? res.status(400).send(result.message) : res.send(result)
})

// PUT
router.put('/:id', async (req, res) => {
  const request = validate.updateMovie(req.body)
  if (request.error !== null) return res.status(400).send(request.error.details[0].message)

  const result = await movies.update(req.params.id, req.body)
  result.error ? res.status(400).send(result.message) : res.send(result)
})

// DELETE
router.delete('/:id', async (req, res) => {
  const movie = await movies.del(req.params.id)
  if (!movie) return res.status(404).send('The movie with given ID was not found')

  res.send(movie)
})

module.exports = router
