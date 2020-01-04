/**
 * @module domain/tag
 * @version 1.0.0
 * @author Peter Schmalfeldt <me@peterschmalfeldt.com>
 */

const _ = require('lodash')

const models = require('../../../models')

const { update } = require('../../../elasticsearch/update/tag')

// Add ElasticSearch Hooks
/* istanbul ignore next: Difficult to Test this without ElasticSearch Fully Mocked */
if (update) {
  models.tags.afterCreate(() => { update() })
  models.tags.afterUpdate(() => { update() })
  models.tags.afterDestroy(() => { update() })
}

/**
 * Domain Tag
 * @type {object}
 */
module.exports = {
  /**
   * Prepare For API Output
   * @param {object} data - Data to be processed for API Output
   * @return {object}
   */
  prepareForAPIOutput (data) {
    const fields = [
      'name',
      'slug'
    ]

    return _.pick(data._source, fields)
  },

  /**
   * Prepare For Elastic Search
   * @param {object} data - Data to be Processed for Elastic Search
   * @param {object} data.id - Tag ID
   * @param {object} data.name - Tag Name
   * @param {object} data.slug - Tag Slug
   * @return {object}
   */
  prepareForElasticSearch (data) {
    return {
      id: data.id,
      name: data.name,
      slug: data.slug
    }
  }
}
