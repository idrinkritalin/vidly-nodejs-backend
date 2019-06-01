const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Users = require('../models/users')
const validate = require('../helpers/dataValidation')

// POST
router.post('/', async (req, res) => {
  const request = validate.auth(req.body)
  if (request.error !== null) return res.status(400).send(request.error.details[0].message)

  let user = await Users.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Inv email or password')

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(400).send('Invalid email or password')

  const token = jwt.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY)
  res.send(token)
})

module.exports = router
