const express = require('express')
const router = express.Router()
const _ = require('lodash')
const users = require('../models/users')
const validate = require('../helpers/dataValidation')

// POST
router.post('/', async (req, res) => {
  const request = validate.user(req.body)
  if (request.error !== null) return res.status(400).send(request.error.details[0].message)

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }

  const response = await users.create(user)
  const { result, token } = response
  result.error
    ? res.status(400).send(result.message)
    : res.header('x-auth-token', token).send(_.pick(result, ['name', 'email']))
})

module.exports = router
