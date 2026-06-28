/**
 * @module routes/update
 * @version 1.0.0
 * @author Peter Schmalfeldt <me@peterschmalfeldt.com>
 */

const del = require('del')
const express = require('express')
const md5 = require('md5')

const config = require('../../../config')
const util = require('./util')

const { UpdateDomain } = require('../domain')

const router = express.Router(config.router)

/**
 * [GET] Categories
 * @memberof module:routes/update
 * @name /update/scorecard
 */
/* istanbul ignore next */
router.route('/update/scorecard').post((request, response) => {
  const token = md5(request.body.token)
  const cleanImport = (request.body.cleanImport && request.body.cleanImport !== 'false')

  if (token !== '8c2ac2951297856f0760a3284c3db03e') {
    return response.json(util.createAPIResponse({
      errors: 'Invalid Token'
    }, request.query.fields))
  }

  const sendError = (err) => {
    if (response.headersSent) {
      console.error(err)
      return null
    }

    const error = err && err.message ? err.message : err

    return response.json(util.createAPIResponse({
      errors: [error]
    }, request.query.fields))
  }

  // Import Scorecard
  return UpdateDomain.downloadScorecard()
    .then(() => UpdateDomain.validateScorecard())
    .then(rowCount => UpdateDomain.importScorecard(rowCount, cleanImport))
    .then((imported) => {
      // Clear Cache since we just changed the data
      del.sync(['.cache/*.cache'])

      // Send Success Response when Import Completed
      return response.json(util.createAPIResponse({
        data: imported.data,
        errors: imported.errors,
        warnings: imported.warnings
      }, request.query.fields))
    })
    .catch(sendError)
})

module.exports = router
