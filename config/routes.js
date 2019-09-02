/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
  'get /api/online': {controller: 'page', action: 'online', view: 'pages/online', layout: 'none' },
  'get /mailer/:email/:code' : {controller: 'page', action: 'mailer'},
  'get /': { view: 'pages/homepage', controller: 'page', action: 'main' },
  'get /hts' : {view: 'pages/howtostart', controller: 'page', action: 'start' },
  'get /about': {view: 'pages/about', controller: 'page', action: 'about'},
  'get /news' : {view: 'pages/news', controller: 'page', action: 'news' },
  'get /account': {view: 'accounts/account', controller: 'accounts', action: 'index'},
  'post /account/avatar': {controller: 'accounts', action:'avatar'},
  'get /account/settings': {view: 'accounts/settings', controller : 'accounts', action: 'settings'},
  'post /account/settings/nickedit': {view: 'accounts/settings', controller : 'accounts', action: 'settings_Nick_edit'},
  '/login'    : {view: 'accounts/login', controller: 'session', action: 'index'},
  '/logout'   : {
      controller: 'session',
      action: 'destroy'
  },
  '/session/create': {controller: 'session', action: 'create'},
  '/account/leader': {controller: 'accounts', action:'leader', view: 'accounts/leader'},
  '/account/leader/rankedit': {controller: 'accounts', action:'rank_edit', view: 'accounts/leader'},
  '/account/admin/' :{controller: 'accounts', action: 'admin_index', view: 'accounts/admin/index'},
  '/account/admin/head': {controller :'accounts', action: 'admin_head', view: 'accounts/admin/head'},
  '/account/admin/head/server': {controller :'accounts', action: 'admin_head_server'},
  '/account/admin/admins': {controller :'accounts', action: 'admin_admins', view: 'accounts/admin/admins'},
  '/account/admin/admins/insert_admin': {controller :'accounts', action: 'admin_admins_insert_admin'},
  '/account/admin/admins/stats/:id': {controller :'accounts', action: 'admin_admins_stats', view: 'accounts/account'},
  '/account/admin/leaders': {controller :'accounts', action: 'admin_leaders', view: 'accounts/admin/leaders'},
  '/account/admin/leaders/insert_leader': {controller :'accounts', action: 'admin_leaders_insert_leader'},
  '/account/admin/leaders/stats/:id': {controller :'accounts', action: 'admin_leaders_stats', view: 'accounts/account'},
  '/account/admin/logs': {controller: 'accounts', action: 'admin_logs', view: 'accounts/admin/logs'},
  '/account/admin/logs/:id': {controller: 'accounts', action: 'admin_logs_by_name', view: 'accounts/admin/logs'},
  '/account/admin/block' : {controller: 'accounts', action: 'admin_block', view: 'accounts/admin/block'},
  '/account/admin/block/banPlayer' : {controller: 'accounts', action: 'admin_block_banPlayer', view: 'accounts/admin/block'},
  '/account/admin/block/warnPlayer' : {controller: 'accounts', action: 'admin_block_warnPlayer', view: 'accounts/admin/block'},
  '/account/admin/block/mutePlayer' : {controller: 'accounts', action: 'admin_block_mutePlayer', view: 'accounts/admin/block'},
  '/account/admin/block/jailPlayer' : {controller: 'accounts', action: 'admin_block_jailPlayer', view: 'accounts/admin/block'},
  'post /api/login/post': {controller: 'login', action: 'post'},
  'get /api/getservers': {controller: 'api', action: 'getservers'},
  'get /api/getnews': {controller: 'api', action: 'getnews'}








    /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
