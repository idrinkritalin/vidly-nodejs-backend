const express = require('express')
const router = express.Router()
const genres = require('../models/genres')
const validate = require('../helpers/dataValidation')

// GET
router.get('/', async (req, res) => {
  const request = await genres.get(req.query.sortBy)
  res.send(request)
})

router.get('/:id', async (req, res) => {
  const genre = await genres.getOne(req.params.id)
  genre.error ? res.status(400).send(genre.message) : res.send(genre)
})

// POST
router.post('/', async (req, res) => {
  const request = validate.genre(req.body)
  if (request.error !== null) return res.status(400).send(request.error.details[0].message)

  const genre = {
    name: req.body.name,
    isRated: req.body.isRated
  }

  const result = await genres.create(genre)
  res.send(result)
})

// PUT
router.put('/:id', async (req, res) => {
  const request = validate.updateGenre(req.body)
  if (request.error !== null) return res.status(400).send(request.error.details[0].message)

  const genre = await genres.update(req.params.id, req.body)
  genre.error ? res.status(400).send(genre.message) : res.send(genre)
})

// DELETE
router.delete('/:id', async (req, res) => {
  const genre = await genres.del(req.params.id)
  if (!genre) return res.status(404).send('The genre with given ID was not found')

  res.send(genre)
})

module.exports = router
