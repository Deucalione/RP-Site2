/**
 * Log.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

      player: {type: 'string'},
      action: {type: 'string'},
      value: {type: 'string'},
      reason: {type: 'string'},
      target: {type: 'string'},
      date: {type:'string'},
      time: {type: 'string'},
      timestamp: {type: 'string'}

  },

};

