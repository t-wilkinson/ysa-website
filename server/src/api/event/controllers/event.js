'use strict';

/**
 *  event controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::event.event', ({ strapi }) => ({
  async daysWithEvents(ctx) {
    let { month, year } = ctx.query?.filters
    month = Number(month)
    year = Number(year)
    const startOfMonth = new Date(year, month - 1, 1)
    const endOfMonth = new Date(year, month, 0)

    let eventsWithinMonth = await strapi.entityService.findMany('api::event.event', {
      filters: {
        start: {
          $gte: startOfMonth.toJSON(),
          $lte: endOfMonth.toJSON(),
        },
      }
    })

    const daysWithEvent = eventsWithinMonth.reduce((acc, event) => {
      const date = new Date(event.start)
      acc.add(date.getDate())
      return acc
    }, new Set())
    return [...daysWithEvent]
  }
}));
