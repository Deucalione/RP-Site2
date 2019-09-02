/**
 * AccountsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let child_process = require('child_process')
module.exports = {
    settings_Nick_edit: async (req,res) =>{
        let userx = req.session.User;
        if(!req.session.User && !req.param('new_nick_edit'))
        {
            res.badRequest();
        }
        else if(req.session.User.money  < 30)
        {
            res.view({user: userx, Title: 'Настройки',error: 'Недостаточно кредитов'});
        }
        else if(req.param('new_nick_edit') !== req.param('new_nick_edit_again')){
            res.view({user: userx, Title: 'Настройки',error: 'Ники не совпадают'})
        }
        else {
            const count = await Accounts.count({name: req.param('new_nick_edit')})
            console.log(count)
            if(count >= 1) {
                res.view({user: userx, Title: 'Настройки', error: 'Данный ник занят'})
            }
            else {
                let nick = req.param('new_nick_edit');
                console.log(nick);
                let user = 0;
                await Accounts.update({name: req.session.User.name}).set({name: nick, money: req.session.User.money-30}); //Снимаем бабки!!
                await Accounts.find({name: nick}).exec(async (err, response) => {
                    req.session.auth = true;
                    req.session.User = response[0];
                    user = response[0];
                    res.view({user: user, Title: 'Настройки', error: 'Ник изменён'});
                });
            }
        }

    },
    settings: async (req,res) =>{
        await Accounts.findOne({name: req.session.User.name}).exec(function (err, user) {
            req.session.User = user;
            res.view({error: '',user: user, Title: 'Настройки'})
        });
    },
    index: async (req, res) => {
        await Accounts.findOne({name: req.session.User.name}).exec(function (err, user) {
                req.session.User = user;
                res.view({user: user, Title: 'Личный кабинет'})
        });
    },

    avatar: async (req, res) =>{
        console.log('callAvatarUpdate');
        if(!req.session.User && !req.param('avatar'))
        {
             res.badRequest();
        }
        else {
            let avatar = req.param('avatar');
            let user =0;
            sails.log(avatar);
            await Accounts.updateOne({name: req.session.User.name}).set({avatar:avatar});
            await Accounts.findOne({name: req.session.User.name}).exec(async(err, response)=> {
                req.session.auth = true;
                req.session.User = response;
                user = response;
                res.send('ok');
        });
        }
    },
    leader: async (req, res) => {

        await Accounts.findOne({name: req.session.User.name}).exec(async (err, user) =>{
            req.session.User = user;
            let member = {};
            await Accounts.find({member: user.member}).exec(function (err, result) {
                member = result
               //console.log(result[2]);
                res.view({user: user, Title: 'Лидерская панель', error: '', member: member})
            })
        });


    },
    rank_edit: async (req,res ) => {
        let nick = req.param('nick'), rank = req.param('rank')
        let target = {};
        Accounts.findOne({name: nick}).exec(async (err,result) =>{
            target = result;
            console.log(result.member)
            if(target.member !== req.session.User.member) {res.view({error: 'Данный игрок не сотрудник вашей организации.',Title: 'Лидерская панель', user: req.session.User})}
            else if(rank === target.rank) {res.view({error: 'Ранги не различаются',Title: 'Лидерская панель', user: req.session.User})}
            else if(rank >= 10) {res.view({error: 'Нельзя повысить старше 9 ранга',Title: 'Лидерская панель', user: req.session.User})}
            else if(target.online) {res.view({error: 'Данный игрок онлайн.',Title: 'Лидерская панель', user: req.session.User})}
            else if(nick === req.session.User.name){ res.view({error: 'Нельзя изменить ранг себе',Title: 'Лидерская панель', user: req.session.User})}
            else {

                await Accounts.updateOne({name: nick}).set({rank: rank});
                res.view({error: 'Игрок повышен', Title: 'Лидерская панель', user: req.session.User});
            }
        })
        //console.log(target.member)


    },
    admin_index: async (req, res) => {
        await Accounts.findOne({name: req.session.User.name}).exec(async (err, user)=> {
            req.session.User = user;
            let dataStats = {};
            let dataStatsJob = {};
            const playerData = await Accounts.count({online: 1});
            const leaderData = await Accounts.count({online: 1, leader: {'>': 1}});
            const adminData = await Accounts.count({online: 1, admlvl: {'>': 1}});
            const gosData = await Accounts.count({online: 1, member: {'<': 8}});
            const nelegalData = await Accounts.count({online: 1, member: {'>': 8}});
            dataStats = '['+playerData+', '+leaderData+', '+adminData+', '+gosData+', '+nelegalData+']';
            const busJob = await Accounts.count({online: 1, job: 1});
            const taxiJob = await Accounts.count({online: 1, job: 2});
            const truckJob = await Accounts.count({online: 1, job: 3});
            dataStatsJob = '['+busJob+', '+taxiJob+', '+truckJob+']';
            await res.view({user: user, Title: 'ACP - Главная', dataStats: dataStats, dataStatsJob: dataStatsJob})
        });
    },
    admin_head : async (req, res) => {

        await Accounts.findOne({name: req.session.User.name}).exec( async (err, user) => {
            req.session.User = user;

            await res.view({user: user, Title: 'ACP - Руководители'})
        })

    },
    admin_head_server : async (req, res) => {
        if(!req.session.User.admlvl && !req.param('avatar'))
        {
            res.badRequest();
        }
        let restart = req.param('restart');
        let start = req.param('start');
        let stop = req.param('stop');
        if(restart){
            console.log('restart');
            res.send('ok');
            child_process.exec('sudo /usr/local/bin/./cr-server.sh restart 2>/dev/null >/dev/null &', function (err, stdout, stderr) {
                if(err){
                    console.log('ERROR EXEC: ' + err)
                }
                console.log('STDOUT: ' + stdout);
                console.log('STDERR: ' + stderr);
            })
        }
        else if(stop){
            console.log('stop');
            res.send('ok');
            child_process.exec('sudo /usr/local/bin/./cr-server.sh stop 2>/dev/null >/dev/null &', function (err, stdout, stderr) {
                if(err){
                    console.log('ERROR EXEC: ' + err)
                }
                console.log('STDOUT: ' + stdout);
                console.log('STDERR: ' + stderr);
            })
        }
        else if(start){
            console.log('start');
            res.send('ok');
            child_process.exec('sudo /usr/local/bin/./cr-server.sh start 2>/dev/null >/dev/null &', function (err, stdout, stderr) {
                if(err){
                    console.log('ERROR EXEC: ' + err)
                }
                console.log('STDOUT: ' + stdout);
                console.log('STDERR: ' + stderr);
            })
        }

    },
    admin_admins : async (req, res) => {

        await Accounts.findOne({name: req.session.User.name}).exec( async (err, user) => {
            req.session.User = user;
            let admin;
            await Accounts.find({admlvl: {'>=' : 1}}).exec(async (err, result) => {
                admin = result;
                await res.view({user: user, Title: 'ACP - Администраторы', admins: admin})
            });
        })

    },
    admin_admins_insert_admin : async (req, res) => {

       let admin = req.param('admin');
       let lvl = req.param('lvl');
       let count = await Accounts.count({name: admin});
       if(lvl > 6) {res.send('Назначение на руководителя происходит в игре!')}
       else if(count === 0) {res.send('Аккаунт не найден!')}
       else {
           await Accounts.updateOne({name: admin}).set({admlvl: lvl});
           res.send('Вы назначили игрока '+admin+' администратором '+lvl+' уровня')
       }
    },
    admin_admins_stats : async (req, res) => {
        console.log(req.params.id);
        await Accounts.findOne({name: req.params.id}).exec( async (err, user) => {
            console.log(user);
            await res.view({user: user, Title: 'ACP - Администраторы'})
        })

    },
    admin_leaders : async (req, res) => {

        await Accounts.findOne({name: req.session.User.name}).exec( async (err, user) => {
            req.session.User = user;
            let leader;
            await Accounts.find({leader: {'>=' : 1}}).exec(async (err, result) => {
                leader = result;
                await res.view({user: user, Title: 'ACP - Лидеры', admins: leader})
            });
        })

    },
    admin_leaders_insert_leader : async (req, res) => {

        let admin = req.param('leader');
        let lvl = req.param('lvl');
        let count = await Accounts.count({name: admin});
        if(count === 0) {res.send('Аккаунт не найден!')}
        else {
            await Accounts.updateOne({name: admin}).set({leader: lvl, member: lvl, rank: 10});
            res.send('Вы назначили игрока '+admin+' лидером '+lvl+' фракции')
        }
    },
    admin_leaders_stats : async (req, res) => {
        console.log(req.params.id);
        await Accounts.findOne({name: req.params.id}).exec( async (err, user) => {
            console.log(user);
            await res.view({user: user, Title: 'ACP - Лидеры'})
        })

    },
    admin_logs : async (req, res) => {

        await Accounts.findOne({name: req.session.User.name}).exec( async (err, user) => {
            req.session.User = user;
            let logs;
            await Log.find({}).sort('id DESC').exec(async (err, result) => {
                logs = result;
                await res.view({user: user, Title: 'ACP - Логи', logs: logs})
            })
        })

    },
    admin_logs_by_name : async (req, res) => {
        let name = req.params.id;
        console.log(name)
        await Accounts.findOne({name: req.session.User.name}).exec( async (err, user) => {
            req.session.User = user;
            let logs;
            await Log.find({or: [{player: name}, {target: name}]}).sort('id DESC').exec(async (err, result) => {
                logs = result;
                await res.view({user: user, Title: 'ACP - Логи', logs: logs})
            })
        })

    },
    admin_block : async (req, res) => {

        await Accounts.findOne({name: req.session.User.name}).exec( async (err, user) => {
            req.session.User = user;
            await res.view({user: user, Title: 'ACP - Выдача наказаний'})

        })

    },
    admin_block_banPlayer : async (req, res) => {
        let nick = req.param('nick');
        let day = req.param('day');
        let reason = req.param('reason');
        let count = await Accounts.count({name: nick});
        var unix = Math.round(+new Date()/1000) + 60*60*24*day;
        if(count < 1) {res.send('Аккаунт не найден!')}
        else {
            await Accounts.findOne({name: nick}).exec(async (err, user) => {

                if (user.online) {
                    res.send('Данный игрок на сервере!')
                }
                else if (req.session.User.admlvl < user.admlvl) {
                    res.send('Вы не можете заблокировать старшего администратора!');
                }
                else {
                    let sql = '\''+nick+'\' , \''+req.session.User.name+'\' , \''+unix+'\' , \''+reason+'\'';
                    await Accounts.getDatastore().sendNativeQuery('INSERT INTO banlist(name, admin, timestamp, text) VALUES ('+sql+')');
                    await Accounts.updateOne({name: nick}).set({leader: 0, member: 0, admlvl: 0, rank: 0});
                    res.send('Аккаунт заблокирован на '+day+' д.');
                }

            })
        }

    },
    admin_block_warnPlayer : async (req, res) => {
        let nick = req.param('nick');
        let reason = req.param('reason');
        let count = await Accounts.count({name: nick});
        if(count < 1) {res.send('Аккаунт не найден!')}
        else {
            await Accounts.findOne({name: nick}).exec(async (err, user) => {

                if (user.online) {
                    res.send('Данный игрок на сервере!')
                }
                else if (req.session.User.admlvl < user.admlvl) {
                    res.send('Вы не можете выдать предупреждение старшему администратору!');
                }
                else {
                    await Accounts.updateOne({name: nick}).set({leader: 0, member: 0, admlvl: 0, rank: 0, warn : 1, warntime: 3600, offwarn: 1, warner: req.session.User.name, warnreason: reason});
                    res.send('Предупреждение выдано по причине: '+reason+'');

                }

            })
        }

    },
    admin_block_mutePlayer : async (req, res) => {
        let nick = req.param('nick');
        let time = req.param('time');
        let reason = req.param('reason');
        let count = await Accounts.count({name: nick});
        if(count < 1) {res.send('Аккаунт не найден!')}
        else {
            await Accounts.findOne({name: nick}).exec(async (err, user) => {

                if (user.online) {
                    res.send('Данный игрок на сервере!')
                }
                else if (req.session.User.admlvl < user.admlvl) {
                    res.send('Вы не можете выдать мут старшему администратору!');
                }
                else {
                    await Accounts.updateOne({name: nick}).set({mute: 1, mutetime: time, offmute: 1, offmuter: req.session.User.name, mutereason: reason});
                    res.send('Блокировка чата выдана по причине: '+reason+'');

                }

            })
        }

    },
    admin_block_jailPlayer : async (req, res) => {
        let nick = req.param('nick');
        let time = req.param('time');
        let reason = req.param('reason');
        let count = await Accounts.count({name: nick});
        if(count < 1) {res.send('Аккаунт не найден!')}
        else {
            await Accounts.findOne({name: nick}).exec(async (err, user) => {

                if (user.online) {
                    res.send('Данный игрок на сервере!')
                }
                else if (req.session.User.admlvl < user.admlvl) {
                    res.send('Вы не можете выдать деморган старшему администратору!');
                }
                else {
                    await Accounts.updateOne({name: nick}).set({ajail: 1, ajailtime: time, offajail: 1, offajailer: req.session.User.name, offajailreason: reason  });
                    res.send('Деморган выдан по причине: '+reason+'');

                }

            })
        }

    },



};

