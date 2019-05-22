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
  const request = await genres.get()
  const genre = request.find(c => c.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('The genre with given ID was not found')
  res.send(genre)
})

// POST
router.post('/', async (req, res) => {
  const request = validate.genre(req.body)
  if (request.error !== null) return res.status(400).send(request.error.details[0].message)

  const data = await genres.get()
  const lastItem = data.length !== 0 ? data[data.length - 1] : null
  const genre = {
    id: lastItem === null ? 1 : lastItem.id + 1,
    name: req.body.name,
    isRated: req.body.isRated
  }
  const result = await genres.create(genre)
  res.send(result)
})

// PUT
router.put('/:id', async (req, res) => {
  const request = validate.genre(req.body)
  if (request.error !== null) return res.status(400).send(request.error.details[0].message)

  const genre = await genres.update(req.params.id, req.body)
  if (!genre) return res.status(404).send('The genre with given ID was not found')

  res.send(genre)
})

// DELETE
router.delete('/:id', async (req, res) => {
  const genre = await genres.del(req.params.id)
  if (!genre) return res.status(404).send('The genre with given ID was not found')

  res.send(genre)
})

module.exports = router
