const express = require('express')
const router = express.Router()
const customers = require('../models/customers')
const validate = require('../helpers/dataValidation')

// GET
router.get('/', async (req, res) => {
  const request = await customers.get(req.query.sortBy)
  res.send(request)
})

router.get('/:id', async (req, res) => {
  const customer = await customers.getOne(req.params.id)
  customer.error ? res.status(400).send(customer.message) : res.send(customer)
})

// POST
router.post('/', async (req, res) => {
  const request = validate.customer(req.body)
  if (request.error !== null) return res.status(400).send(request.error.details[0].message)

  const customer = {
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  }

  const result = await customers.create(customer)
  res.send(result)
})

// PUT
router.put('/:id', async (req, res) => {
  const request = validate.updateCustomer(req.body)
  if (request.error !== null) return res.status(400).send(request.error.details[0].message)

  const result = await customers.update(req.params.id, req.body)
  result.error ? res.status(400).send(result.message) : res.send(result)
})

// DELETE
router.delete('/:id', async (req, res) => {
  const customer = await customers.del(req.params.id)
  if (!customer) return res.status(404).send('The customer with given ID was not found')

  res.send(customer)
})

module.exports = router
