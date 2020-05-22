const qs = require('qs')

const config = require('../../config')
const { getStatusFromError } = require('../utils/error-status')

function handleUnauthorized(err, req, res, next) {
  if (getStatusFromError(err) !== 401) return next(err)

  redirectToLogin(req, res)
}

function redirectToLogin(req, res) {
  const queryString = qs.stringify({
    redirectTo: config.baseUrl + req.originalUrl,
  })

  const loginUrl = config.auth.signinUrl + '/?' + queryString
  res.redirect(loginUrl)
}

module.exports = handleUnauthorized

