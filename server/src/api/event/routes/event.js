'use strict';

/**
 * event router.
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/events',
      handler: 'event.find',
    },
    {
      method: 'GET',
      path: '/events/days',
      handler: 'event.daysWithEvents',
    },
  ]
};
