"use strict"

const fs = require('fs')
const path = require('path')
const bunyan = require('bunyan')

const config = require('../../config')

try {
  fs.statSync(config.bunyan.logDir)
} catch (e) {
  fs.mkdirSync(config.bunyan.logDir)
}

function serializeRequest(req) {
  if (!req || !req.connection) return req

  return {
    method: req.method,
    url: req.url,
    originalUrl: req.originalUrl,
    headers: req.headers
  }
}

function serializeResponse(res) {
  if (!res || !res.statusCode) return res

  return {
    statusCode: res.statusCode,
    header: res._header,
    nocache: res.nocache
  }
}

function serializeAxiosError(error) {
  if (!error || !error.config)
    return error

  const errorData = {
    config: error.config
  }
  if (error.response)
    errorData.response = {
      headers: error.response.headers,
      data: JSON.stringify(error.response.data, null, 2),
      status: error.response.status,
      statusText: error.response.statusText,
    }

  return errorData
}

const logger = bunyan.createLogger({
  name: config.bunyan.appLogFileName.replace('.log', ''),
  serializers: {
    err: error => Object.assign({}, bunyan.stdSerializers.err(error), serializeAxiosError(error)),
    req: serializeRequest,
    res: serializeResponse
  },
  streams: [
    {
      type: 'rotating-file',
      period: '1w',
      count: 3,
      level: config.bunyan.logLevel,
      path: path.join(config.bunyan.logDir, config.bunyan.appLogFileName)
    },
    {
      level: config.bunyan.logLevel,
      stream: process.stdout
    }
  ]
})

module.exports = logger
