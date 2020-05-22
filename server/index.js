'use strict'

const config = require('../config')
//import config from '../config.js'
import logger from './util/logger.js'
import app from '../dist/app.bundle.js'
//const logger = require('./util/logger')
//const app = require('../dist/app.bundle')

const SHUTDOWN_DELAY_WHILE_LOG_WRITES_FINISH = 15

killProcessOn('uncaughtException')
killProcessOn('unhandledRejection')

process.on('SIGINT', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)

const server = app.listen(config.server.port, config.server.host, function() {
  logger.info(`Listening at http://${config.server.host}:${config.server.port}`)
})

function gracefulShutdown() {
  logger.info('attempting graceful shutdown...')
  return shutdownServer().then(() =>
    setTimeout(() => process.exit(0), SHUTDOWN_DELAY_WHILE_LOG_WRITES_FINISH)
  )
}

function killProcessOn(eventName) {
  process.on(eventName, function(err) {
    logger.fatal(err, eventName)

    if (config.newRelic.enabled) alertNewRelicOfCrash(err, crash)
    else crash()
  })
}

function alertNewRelicOfCrash(err, done) {
  var newRelic = require('newrelic')

  newRelic.noticeError(err, { crash: true })

  logger.info('Sending Errors to New Relic')
  newRelic.agent.harvest(function() {
    logger.info('New Relic Send Complete, Crashing Process')
    done()
  })
}

function crash() {
  setTimeout(() => process.exit(1), SHUTDOWN_DELAY_WHILE_LOG_WRITES_FINISH)
}

function shutdownServer() {
  logger.info('attempting to close the http server...')
  return new Promise((resolve, reject) => {
    let timeout = setTimeout(() => {
      logger.info(
        `The http server still has not closed after ${
          config.server.shutdownTimeout
        } milliseconds. This is likely because of sockets still being open. Proceeding with a forced shutdown.`
      )
      resolve()
    }, config.server.shutdownTimeout)

    server.close(function() {
      clearTimeout(timeout)
      logger.info('http server closed gracefully')
      resolve()
    })
  })
}

module.exports = server
