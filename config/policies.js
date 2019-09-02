/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/
  AccountsController: {
      'index': 'user',
      'settings': 'user',
      'settings_Nick_edit': 'user',
      'rank_edit': 'leader',
      'leader': 'leader',
      'avatar': 'user',
      'admin_index' : 'admin1',
      'admin_head' : 'admin7',
      'admin_head_server' : 'admin7',
      'admin_admins' : 'admin1',
      'admin_admins_insert_admin': 'admin7',
      'admin_admins_stats' : 'admin3',
      'admin_leaders' : 'admin1',
      'admin_leaders_insert_leader': 'admin6',
      'admin_leaders_stats' : 'admin3',
      'admin_logs' : 'admin6',
      'admin_logs_by_name' : 'admin6',
      'admin_block' : 'admin2',
      'admin_block_banPlayer' : 'admin3',
      'admin_block_warnPlayer': 'admin3',
      'admin_block_mutePlayer' : 'admin2',
      'admin_block_jailPlayer' : 'admin2',

  },
  SessionController: {
      create: 'noauth',
      index: 'noauth'
  },
  // '*': true,

};
