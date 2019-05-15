const util = require('util')
const debug = require('debug')('app:startup')

function req (req, res, next) {
  Object.keys(req.body).length !== 0
    ? debug('Request body: ', util.inspect(req.body, false, null, true))
    : null
  next()
}

module.exports.req = req
