const express = require('express')
const router = express.Router()
const validate = require('../helpers/dataValidation')

// TEST DATA
const dataGenres = [
  { id: 1, name: 'Thriller' },
  { id: 2, name: 'Romantic' },
  { id: 3, name: 'Porn' },
  { id: 4, name: 'Comedy' }
]

// GET
router.get('/', (req, res) => {
  res.send(dataGenres)
})

router.get('/:id', (req, res) => {
  const genre = dataGenres.find(c => c.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('The genre with given ID was not found')
  res.send(genre)
})

// POST
router.post('/', (req, res) => {
  const result = validate.genre(req.body)

  // 400 Bad Request
  if (result.error !== null) return res.status(400).send(result.error.details[0].message)

  // 200 OK Request
  const lastItem = dataGenres[dataGenres.length - 1]
  const genre = {
    id: lastItem.id + 1,
    name: req.body.name
  }
  dataGenres.push(genre)
  res.send(genre)
})

// PUT
router.put('/:id', (req, res) => {
  const genre = dataGenres.find(c => c.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('The genre with given ID was not found')

  const result = validate.genre(req.body)

  // 400 Bad Request
  if (result.error !== null) return res.status(400).send(result.error.details[0].message)

  // 200 OK Request
  genre.name = req.body.name
  res.send(genre)
})

// DELETE
router.delete('/:id', (req, res) => {
  const genre = dataGenres.find(c => c.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('The genre with given ID was not found')

  // 200 OK Request
  const index = dataGenres.indexOf(genre)
  dataGenres.splice(index, 1)
  res.send(genre)
})

module.exports = router
