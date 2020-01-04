/**
 * @module routes/profile
 * @version 1.0.0
 * @author Peter Schmalfeldt <me@peterschmalfeldt.com>
 */

const express = require('express')
const config = require('../../../config')
const util = require('./util')

const { ProfileDomain } = require('../domain')

const router = express.Router(config.router)

/**
 * Profile Activity
 * @memberof module:routes/profile
 * @name [GET] /profile/activity
 * @property {number} [pageSize=30] - Set Number of Results per Page
 * @property {number} [page=1] - Result Page to Load
 * @property {boolean} [pretty=false] - Format JSON response to be human readable
 */
/* istanbul ignore next */
router.route('/profile/activity').get((request, response) => {
  util.isValidUser(request, (validUserId) => {
    if (validUserId) {
      ProfileDomain.getActivity(validUserId).then((activity) => {
        response.json(util.createAPIResponse({
          data: activity
        }, request.query.fields))
      }).catch((errors) => {
        response.status(400)
        response.json(util.createAPIResponse({
          errors: [errors.toString()]
        }, request.query.fields))
      })
    } else {
      response.json(util.createAPIResponse({
        errors: ['Invalid API Authorization Token']
      }, request.query.fields))
    }
  })
})

/**
 * Profile Notifications
 * @memberof module:routes/profile
 * @name [GET] /profile/notifications
 * @property {number} [pageSize=30] - Set Number of Results per Page
 * @property {number} [page=1] - Result Page to Load
 * @property {boolean} [pretty=false] - Format JSON response to be human readable
 */
/* istanbul ignore next */
router.route('/profile/notifications').get((request, response) => {
  util.isValidUser(request, (validUserId) => {
    if (validUserId) {
      ProfileDomain.getNotifications(validUserId).then((user) => {
        response.json(util.createAPIResponse({
          data: user.publicJSON()
        }, request.query.fields))
      }).catch((errors) => {
        response.status(400)
        response.json(util.createAPIResponse({
          errors: [errors.toString()]
        }, request.query.fields))
      })
    } else {
      response.json(util.createAPIResponse({
        errors: ['Invalid API Authorization Token']
      }, request.query.fields))
    }
  })
})

module.exports = router
