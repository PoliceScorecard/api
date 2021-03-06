#!/usr/bin/env node

/**
 * @module server
 * @version 1.0.0
 * @author Peter Schmalfeldt <me@peterschmalfeldt.com>
 */

const bugsnag = require('@bugsnag/js')
const bugsnagExpress = require('@bugsnag/plugin-express')
const Debug = require('debug')
const dotenv = require('dotenv')
const express = require('express')
const flatCache = require('flat-cache')
const rateLimit = require('express-rate-limit')
const session = require('express-session')
const uuid = require('uuid')
const cors = require('cors')
const md5 = require('md5')

const analytics = require('./analytics')
const config = require('./config')
const router = require('./router')
const routerUtil = require('./api/v1/routes/util')

const models = require('./models')

/**
 * Static Cache Wrapper for JSON API Response
 */
class Cache {
  constructor (name, path, cacheTime = 0) {
    this.name = name
    this.path = path
    this.cache = flatCache.load(name, path)
    this.expire = cacheTime === 0 ? false : cacheTime * 1000 * 60
  }

  getKey (key) {
    var now = new Date().getTime()
    var value = this.cache.getKey(key)
    if (value === undefined || (value.expire !== false && value.expire < now)) {
      return undefined
    } else {
      return value.data
    }
  }

  setKey (key, value) {
    var now = new Date().getTime()
    this.cache.setKey(key, {
      expire: this.expire === false ? false : now + this.expire,
      data: value
    })
  }

  removeKey (key) {
    this.cache.removeKey(key)
  }

  save () {
    this.cache.save(true)
  }

  remove () {
    flatCache.clearCacheById(this.name, this.path)
  }
}

// create flat cache routes
const flatCacheMiddleware = (req, res, next) => {
  if (req && typeof req.method !== 'undefined' && req.method === 'GET') {
    const url = req.originalUrl || req.url
    const key = md5('__express__' + url)

    const cacheFile = `${md5(url)}.cache`
    const cache = new Cache(cacheFile, '.cache')
    const cacheContent = cache.getKey(key)

    if (cacheContent) {
      res.send(cacheContent)
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        // check if we got a response
        if (body && typeof body === 'string') {
          // Check if the response had errors
          if (body.indexOf('\"errors\": []') === -1) { // eslint-disable-line no-useless-escape
            res.sendResponse(body)
          } else {
            // No errors detected, safe to cache response
            cache.setKey(key, body)
            cache.save()
            res.sendResponse(body)
          }
        }
      }
      next()
    }
  } else {
    next()
  }
}

// Import Environment before Remaining Imports
dotenv.config({
  silent: true
})

const app = express()
const debug = Debug('express:api')

const apiLimit = {
  delayAfter: 0,
  delayMs: 0,
  windowMs: 24 * 60 * 60 * 1000,
  max: 2500
}

let limiter = rateLimit(apiLimit)
const apiUser = {}

process.title = 'api'

/* istanbul ignore next */
const SetupAPI = (request, response, next) => {
  if ('pretty' in request.query && request.query.pretty !== 'false') {
    app.set('json spaces', 2)
  } else {
    app.set('json spaces', 0)
  }

  let host = request.headers.origin
  const acceptedMethods = ['OPTIONS']

  if (request.header('API-Key')) {
    request.query.apikey = request.header('API-Key')
  }

  if (request.headers.host) {
    apiUser.host = request.headers.host
  }

  if (request.query.apikey) {
    analytics.trackEvent(request.query.apikey, 'API Key', request.query.apikey, request.url)

    return models.api_authentication.findOne({
      where: {
        api_key: request.query.apikey
      }
    }).then((user) => {
      if (user) {
        const settings = user.dataValues

        if (settings.allow_api_get) {
          acceptedMethods.push('GET')
        }

        if (settings.allow_api_post) {
          acceptedMethods.push('POST')
        }

        if (settings.allow_api_put) {
          acceptedMethods.push('PUT')
        }

        if (settings.allow_api_delete) {
          acceptedMethods.push('DELETE')
        }

        // Allow OPTIONS from all hosts
        if (request.method === 'OPTIONS') {
          host = '*'
        }

        response.setHeader('X-Powered-By', 'API')
        response.setHeader('Content-Type', 'application/json; charset=utf-8')
        response.setHeader('Access-Control-Max-Age', '7200')
        response.setHeader('Access-Control-Allow-Credentials', 'true')
        response.setHeader('Access-Control-Allow-Headers', 'Accept, Access-Control-Allow-Methods, Authorization, Content-Type, X-Powered-By')
        response.setHeader('Access-Control-Allow-Methods', acceptedMethods.join(', '))

        if (host) {
          response.setHeader('Access-Control-Allow-Origin', host)
        }

        if (!settings.allow_api_get && request.method === 'GET') {
          analytics.trackEvent(request.query.apikey, request.method, 'Request Denied', request.url)
          return response.status(403).end(JSON.stringify(routerUtil.createAPIResponse({
            errors: ['API Key does not support GET Requests']
          })))
        }

        if (!settings.allow_api_post && request.method === 'POST') {
          analytics.trackEvent(request.query.apikey, request.method, 'Request Denied', request.url)

          return response.status(403).end(JSON.stringify(routerUtil.createAPIResponse({
            errors: ['API Key does not support POST Requests']
          })))
        }

        if (!settings.allow_api_put && request.method === 'PUT') {
          analytics.trackEvent(request.query.apikey, request.method, 'Request Denied', request.url)

          return response.status(403).end(JSON.stringify(routerUtil.createAPIResponse({
            errors: ['API Key does not support PUT Requests']
          })))
        }

        if (!settings.allow_api_delete && request.method === 'DELETE') {
          analytics.trackEvent(request.query.apikey, request.method, 'Request Denied', request.url)
          return response.status(403).end(JSON.stringify(routerUtil.createAPIResponse({
            errors: ['API Key does not support DELETE Requests']
          })))
        }

        // Check for approved host
        if (settings.approved_whitelist && settings.approved_whitelist !== '*') {
          const whitelist = settings.approved_whitelist.split(',')
          let validHost = false

          for (let i = 0; i < whitelist.length; i++) {
            if (whitelist.indexOf(apiUser.host) !== -1) {
              validHost = true
              break
            }
          }

          if (!validHost) {
            analytics.trackEvent(request.query.apikey, 'Invalid Host', apiUser.host, request.url)
            return response.status(401).send(JSON.stringify(routerUtil.createAPIResponse({
              errors: ['Invalid Host for API Key']
            })))
          }
        }

        // Set API Limits
        apiLimit.max = (!isNaN(settings.daily_limit)) ? (parseInt(settings.daily_limit, 10)) : 1000
        limiter = rateLimit(apiLimit)

        next()
      } else {
        analytics.trackEvent(request.query.apikey, request.method, 'Invalid API Key', request.url)
        return response.status(401).end(JSON.stringify(routerUtil.createAPIResponse({
          errors: ['Invalid API Key']
        })))
      }
    }).catch((err) => {
      analytics.trackEvent(request.query.apikey, request.method, 'Invalid API Authentication', request.url)
      return response.status(401).end(JSON.stringify(routerUtil.createAPIResponse({
        errors: ['Invalid API Authentication', err]
      })))
    })
  } else {
    analytics.trackEvent(request.query.apikey, request.method, 'Missing API Key', request.url)
    return response.status(401).end(JSON.stringify(routerUtil.createAPIResponse({
      errors: ['Missing API Key']
    })))
  }
}

function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}

function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}

function errorHandler (err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })
}

// Use string ETag
app.set('etag', 'strong')

app.enable('trust proxy')
app.use(cors())

/**
 * Allow for Timeout JSON Response
 */
/* istanbul ignore next */
app.use((req, res, next) => {
  res.setTimeout(1000000, () => {
    if (req.header('API-Key')) {
      req.query.apikey = req.header('API-Key')
    }
    analytics.trackEvent(req.query.apikey, 'Error', 'Request Timed Out', req.url)
    res.status(408).end(JSON.stringify(routerUtil.createAPIResponse({
      errors: ['Request Timed Out']
    })))
  })

  next()
})

/* istanbul ignore next */
app.use(session({
  genid: () => {
    return uuid.v4()
  },
  secret: config.get('sessionKey'),
  resave: true,
  saveUninitialized: true
}))

// Check if we should use Bugsnag
if (config.get('devFlags.enableBugTracking') && config.get('bugsnag') !== '') {
  const bugsnagClient = bugsnag(config.get('bugsnag'))

  bugsnagClient.use(bugsnagExpress)

  const bugsnagMiddleware = bugsnagClient.getPlugin('express')

  app.use(bugsnagMiddleware.requestHandler)
  app.use(bugsnagMiddleware.errorHandler)
}

app.use('/', express.static(`${__dirname}/static`))
app.use('/assets', express.static(`${__dirname}/static/assets`))
app.use('/index.html', express.static(`${__dirname}/static/index.html`))
app.use('/favicon.ico', express.static(`${__dirname}/static/favicon.ico`))
app.use('/robots.txt', express.static(`${__dirname}/static/robots.txt`))
app.use('/humans.txt', express.static(`${__dirname}/static/humans.txt`))
app.use('/docs.js', express.static(`${__dirname}/static/docs.js`))
app.use('/docs.css', express.static(`${__dirname}/static/docs.css`))
app.use('/docs', express.static(`${__dirname}/static/docs`))
app.use('/guide', express.static(`${__dirname}/static/guide`))
app.use('/.well-known', express.static(`${__dirname}/.well-known`))

app.use(SetupAPI)
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(flatCacheMiddleware)
app.use(limiter)
app.use(router)

app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

// Fallback for Possible Routes used that do not exist
/* istanbul ignore next */
app.get('*', (req, res) => {
  if (req.header('API-Key')) {
    req.query.apikey = req.header('API-Key')
  }

  analytics.trackEvent(req.query.apikey, req.method, 'Invalid URL', req.url)
  res.status(404).end(JSON.stringify(routerUtil.createAPIResponse({
    errors: [
      'The API Endpoint you are trying to access does not exist.',
      'Please view our Documentation for API Usage Instructions.',
      'https://policescorecard.docs.apiary.io/'
    ]
  })))
})

/**
 * Event listener for HTTP server "error" event.
 */
/* istanbul ignore next */
const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const port = config.get('port')
  const bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
    default:
      console.error(error)
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
/* istanbul ignore next */
const onListening = () => {
  const addr = app.address()
  const bind = (typeof addr === 'string') ? 'pipe ' + addr : 'port ' + addr.port
  debug(`Listening on ${bind}`)
}

app.on('error', onError)
app.on('listening', onListening)

const server = app.listen(config.get('port'))
server.keepAliveTimeout = 1000000
server.headersTimeout = 1005000

module.exports = server
module.exports.setupAPI = SetupAPI
