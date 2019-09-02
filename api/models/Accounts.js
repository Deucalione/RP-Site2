/**
 * Accounts.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      name: {type: 'string'},
      password: {type: 'string'},
      email: {type: 'string'},
      referal: {type: 'string'},
      money: {type: 'number'},
      sex: {type: 'number'},
      skin: {type: 'number'},
      admlvl: {type: 'number'},
      lvl: {type: 'number'},
      exp: {type: 'number'},
      member: {type: 'number'},
      rank: {type: 'number'},
      skinm: {type: 'number'},
      leader: {type: 'number'},
      register_ip: {type: 'string'},
      login_ip: {type: 'string'},
      regdate_day: {type: 'number'},
      regdate_month: {type: 'number'},
      regdate_year: {type: 'number'},
      logdate_day: {type: 'number'},
      logdate_month: {type: 'number'},
      logdate_year: {type: 'number'},
      mute: {type: 'number'},
      mutetime: {type: 'number'},
      offmute: {type: 'number'},
      offmuter: {type: 'string'},
      mutereason: {type: 'string'},
      warn: {type: 'number'},
      offwarn: {type: 'number'},
      warner: {type: 'string'},
      warnreason: {type: 'string'},
      warntime: {type: 'number'},
      salary: {type: 'number'},
      bank: {type: 'number'},
      licb: {type: 'number'},
      lica: {type: 'number'},
      licc: {type: 'number'},
      licd: {type: 'number'},
      licw: {type: 'number'},
      lich: {type: 'number'},
      lics: {type: 'number'},
      kv: {type: 'number'},
      pd: {type: 'number'},
      wanted: {type: 'number'},
      number: {type: 'number'},
      number_m: {type: 'number'},
      jail: {type: 'number'},
      jailtime: {type: 'number'},
      phone: {type: 'number'},
      satiety: {type: 'number'},
      hp: {type: 'number'},
      arm: {type: 'number'},
      hospital: {type: 'number'},
      job: {type: 'number'},
      d_exp: {type: 'number'},
      sdpistol_skill: {type: 'number'},
      deagle_skill: {type: 'number'},
      shotgun_skill: {type: 'number'},
      mp5_skill: {type: 'number'},
      ak47_skill: {type: 'number'},
      rifle_skill: {type: 'number'},
      m4_skill: {type: 'number'},
      zakon: {type: 'number'},
      vip: {type: 'number'},
      awarn: {type: 'number'},
      ajail: {type: 'number'},
      ajailtime: {type: 'number'},
      offajail: {type: 'number'},
      offajailer: {type: 'string'},
      offajailreason: {type: 'string'},
      biztype: {type:'number'},
      bizid: {type: 'number'},
      podmember: {type: 'number'},
      house: {type: 'number'},
      garage: {type: 'number'},
      car1: {type: 'number'},
      car2: {type: 'number'},
      car3: {type: 'number'},
      avatar: {type: 'string'},
      vkrepost: {type: 'number'},
      online: {type: 'number'},
      medcard: {type: 'number'},
      sendmail: {type: 'number'}
  },

};

