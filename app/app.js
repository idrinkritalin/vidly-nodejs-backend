const express = require('express')
const app = express()
const validate = require('./helpers/dataValidation')

app.use(express.json())

const PORT = process.env.PORT || 3001

// TEST DATA
const genres = [
  { id: 1, name: 'Thriller' },
  { id: 2, name: 'Romantic' },
  { id: 3, name: 'Porn' },
  { id: 4, name: 'Comedy' }
]

// GET
app.get('/', (req, res) => {
  res.send('Hello! Use /api/ route to access it.')
})

app.get('/api/genres', (req, res) => {
  res.send(genres)
})

app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('The genre with given ID was not found')
  res.send(genre)
})

// POST
app.post('/api/genres/', (req, res) => {
  const result = validate.genre(req.body)

  // 400 Bad Request
  if (result.error !== null) return res.status(400).send(result.error.details[0].message)

  // 200 OK Request
  const lastItem = genres[genres.length - 1]
  const genre = {
    id: lastItem.id + 1,
    name: req.body.name
  }
  genres.push(genre)
  res.send(genre)
})

// PUT
app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('The genre with given ID was not found')

  const result = validate.genre(req.body)

  // 400 Bad Request
  if (result.error !== null) return res.status(400).send(result.error.details[0].message)

  // 200 OK Request
  genre.name = req.body.name
  res.send(genre)
})

// DELETE
app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('The genre with given ID was not found')

  // 200 OK Request
  const index = genres.indexOf(genre)
  genres.splice(index, 1)
  res.send(genre)
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
