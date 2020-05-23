const path = require('path')
const dotenv = require('dotenv')

const appName = 'pmij'
const projectRootDir = __dirname
const e = process.env

// DOTENV_PATH is used by TeamCity
dotenv.load({ path: process.env.DOTENV_PATH || '.env' })
const isDevelopment = e.NODE_ENV === 'development'

function getBool(configValue) {
  return configValue && configValue.toLowerCase() === 'true'
}

module.exports = {
  appName,
  assets: {
    cache: !isDevelopment,
    entryDir: path.join(projectRootDir, 'src'),
    manifestName: 'manifest.json',
    publicPath: e.CDN_ROOT,
    publicDir: path.join(projectRootDir, 'dist'),
  },
  baseUrl: e.BASE_URL,
  bunyan: {
    appLogFileName: `${appName}-app.log`,
    logDir: e.LOG_DIR,
    logLevel: e.LOG_LEVEL,
    webLogFileName: `${appName}-web.log`,
  },
  externalContexts: {
    auth: {
      signinUrl: e.AUTH_SIGNIN_URL,
      signoutUrl: e.AUTH_SIGNOUT_URL,
    },
    adobe: {
      dtmUrl: e.DTM_URL,
    },
  },
  newRelic: {
    appName: appName,
    enabled: getBool(e.NEW_RELIC_IS_ENABLED),
    license: e.NEW_RELIC_LICENSE_KEY,
    logging: {
      level: 'info',
    },
  },
  prism: {
    version: require('./package.json').devDependencies['@pluralsight/prism'],
  },
  segment: {
    writeKey: e.SEGMENT_WRITE_KEY,
  },
  server: {
    host: e.HOST,
    port: parseInt(e.PORT),
    shutdownTimeout: +e.SHUTDOWN_TIMEOUT,
    urlMountPoint: e.URL_MOUNT_POINT,
    viewsDirectory: path.join(projectRootDir, 'server', 'views'),
  },
}
