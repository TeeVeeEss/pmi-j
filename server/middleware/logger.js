'use strict'

const path = require('path')
const fs = require('fs')
const expressBunyan = require('express-bunyan-logger')
const bunyan = require('bunyan')

function serializeRequest(req) {
  if (!req || !req.connection) return req

  req.headers['x-forwarded-for'] =
    req.headers['x-forwarded-for'] || req.connection.remoteAddress

  return {
    method: req.method,
    url: req.url,
    headers: req.headers,
    remoteAddress: req.connection.remoteAddress,
    remotePort: req.connection.remotePort,
  }
}

module.exports = function(config) {
  try {
    fs.statSync(config.logDir)
  } catch (e) {
    fs.mkdirSync(config.logDir)
  }

  return expressBunyan({
    name: config.webLogFileName.replace('.log', ''),
    streams: [
      {
        type: 'rotating-file',
        period: '1w',
        count: 3,
        level: config.logLevel,
        path: path.join(config.logDir, config.webLogFileName),
      },
      {
        level: config.logLevel,
        stream: process.stdout,
      },
    ],
    serializers: {
      err: error => Object.assign({}, error, bunyan.stdSerializers.err(error)),
      req: serializeRequest,
      res: bunyan.stdSerializers.res,
    },
  })
}
