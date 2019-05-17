const express = require('express')
const router = express.Router()
const genres = require('../models/genres')
const validate = require('../helpers/dataValidation')

// GET
router.get('/', async (req, res) => {
  const result = await genres.get()
  res.send(result)
})

router.get('/:id', async (req, res) => {
  const result = await genres.get()
  const genre = result.find(c => c.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('The genre with given ID was not found')
  res.send(genre)
})

// POST
router.post('/', async (req, res) => {
  const result = validate.genre(req.body)

  // 400 Bad Request
  if (result.error !== null) return res.status(400).send(result.error.details[0].message)

  // 200 OK Request
  const data = await genres.get()
  const lastItem = data[data.length - 1]
  const genre = {
    id: lastItem.id + 1,
    name: req.body.name,
    isRated: req.body.isRated
  }
  genres.create(genre)
  res.send(genre)
})

// PUT
router.put('/:id', async (req, res) => {
  const data = await genres.get()
  const genre = data.find(c => c.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('The genre with given ID was not found')

  const result = validate.genre(req.body)

  // 400 Bad Request
  if (result.error !== null) return res.status(400).send(result.error.details[0].message)

  // 200 OK Request
  genres.update(req.params.id, req.body)
  const updatedGenre = data.find(c => c.id === parseInt(req.params.id))
  res.send(updatedGenre)
})

// DELETE
router.delete('/:id', async (req, res) => {
  const data = await genres.get()
  const genre = data.find(c => c.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('The genre with given ID was not found')

  // 200 OK Request
  genres.del(req.params.id)
  const updatedGenre = data.find(c => c.id === parseInt(req.params.id))
  res.send(updatedGenre)
})

module.exports = router
