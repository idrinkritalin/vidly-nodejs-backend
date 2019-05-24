const express = require('express')
const router = express.Router()
const rentals = require('../models/rentals')
const validate = require('../helpers/dataValidation')

// GET
router.get('/', async (req, res) => {
  const request = await rentals.get(req.query.sortBy)
  res.send(request)
})

router.get('/:id', async (req, res) => {
  const rental = await rentals.getOne(req.params.id)
  rental.error ? res.status(400).send(rental.message) : res.send(rental)
})

// POST
router.post('/', async (req, res) => {
  const request = validate.rental(req.body)
  if (request.error !== null) return res.status(400).send(request.error.details[0].message)

  const rental = {
    customer: req.body.customer,
    movie: req.body.movie
  }

  const result = await rentals.create(rental)
  result.error ? res.status(400).send(result.message) : res.send(result)
})

module.exports = router
