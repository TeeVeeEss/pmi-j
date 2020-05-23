'use strict'

const { getStatusFromError } = require('../utils/error-status')
const errorLogger = require('../utils/logger')

function isTimeoutError(err) {
  return err.code === 'ECONNRESET'
}

module.exports = function(err, req, res, next) {
  const status = isTimeoutError(err) ? 504 : getStatusFromError(err) || 500
  const loggingMsgObj = err.status ? { httpError: err } : err

  if (status >= 500) errorLogger.error(loggingMsgObj)
  else errorLogger.warn(loggingMsgObj)

  res.status(status).render('server-error')
}
