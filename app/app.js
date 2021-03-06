const config = require('config')
const debug = require('debug')('app:startup')
const morgan = require('morgan')
const helmet = require('helmet')
const logger = require('./helpers/logger')
const express = require('express')
const app = express()

// ROUTES
const genres = require('./routes/genres')

// START - REMEMBER TO SET FROM SERVER SIDE process.env.DEBUG=app:*
process.env.DEBUG = 'app:*'
// END

const PORT = process.env.PORT || 3001
const ENV = process.env.NODE_ENV || app.get('env')

// MIDDLEWARES
debug(config.get('name'))
debug(`NODE_ENV: ${ENV}`)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet())
if (ENV === 'development') {
  app.use(morgan('tiny'))
  app.use(logger.req)
}

app.get('/', (req, res) => {
  res.send('Hello! Use /api/ route to access it.')
})

// ROUTER
app.use('/api/genres', genres)

app.listen(PORT, () => debug(`Listening on port ${PORT}...`))
