const mongoose = require('mongoose')
const config = require('config')
const debug = require('debug')('app:*')
const morgan = require('morgan')
const helmet = require('helmet')
const express = require('express')
const app = express()

// DB
const dbName = config.get('dbName')
mongoose.connect(dbName, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log('Error connecting the Database!', err))

// ROUTES
const genres = require('./routes/genres')
const customers = require('./routes/customers')
const movies = require('./routes/movies')
const rentals = require('./routes/rentals')
const users = require('./routes/users')
const auth = require('./routes/auth')

// REMEMBER TO SET FROM SERVER SIDE
process.env.DEBUG = 'app:*'
process.env.JWT_PRIVATE_KEY = 'jwtPrivateKeyMagicLOL69'
// END

const PORT = process.env.PORT || 3001
const ENV = process.env.NODE_ENV || app.get('env')

if (!process.env.JWT_PRIVATE_KEY) {
  debug('Fatal error: jwtPrivateKey is not defined.')
  process.exit(1)
}

// MIDDLEWARES
debug(config.get('name'))
debug(`NODE_ENV: ${ENV}`)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet())
if (ENV === 'development') {
  app.use(morgan('tiny'))
}

app.get('/', (req, res) => {
  res.send('Hello! Use /api/ route to access it.')
})

// ROUTER
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/movies', movies)
app.use('/api/rentals', rentals)
app.use('/api/users', users)
app.use('/api/auth', auth)

app.listen(PORT, () => debug(`Listening on port ${PORT}...`))
