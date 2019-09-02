/**
 * SessionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var sha1 = require('sha1');

module.exports = {

    create: function (req, res) {
        /**
         * Задаем переменные запрашиваемых
         * параметров, в нашем случае логин
         * и пароль
         */
        var username = req.param('username'),
            password = req.param('password');

        console.log(username + password);

        /**
         * Если нет логина или пароля в запросе
         * вывести ошибку, и перенаправить обратно
         * (прим. здесь лучше сделать подробную
         * обработку ошибок, например с flash)
         */

        if (!username || !password) {
            return res.redirect('/login');
        }

        /**
         * Найти пользователя из запроса логина
         * (username - req.param('username'))
         * когда пользователь найден производиться
         * сравнение зашифрованного пароля с паролем
         * который был отправлен запросом, если он
         * валиден, то создается внешний статус -
         * авторизован или нет, и дается доступ к
         * данным через внешний доступ сессии. Это
         * позволит нам в дальнейшем создать политику
         * для ограничивания доступа к определенным
         * разделам нашего блога (используя сессии)
         */
        Accounts.findOne({name: username}).exec(function (err, user) {
            if (!user || err) console.log(err);
            if (user.password === sha1(password)) {
                // Авторизовать пользователя в сессии
                // Дать доступ к данным авторизованного
                // пользователя из сессии
                req.session.auth = true;
                req.session.User = user;
      
                res.redirect('/account');

                /*if (req.session.User.admlvl) {
                    return res.redirect('/admin');
                }*/
            }
        });
    },
    /**
     * Создаем выход из сессии который
     * просматривает есть ли пользователь
     * в онлайне, и уничтожает сессию
     */
    destroy: function (req, res) {
        Accounts.findOne(req.session.User.id).exec(function (err, user) {
            if (user) {
                req.session.destroy();
                res.redirect('/');
            } else { res.redirect('/login'); }
        });
    },

    // @MAIN

    index: function (req, res) {
        res.view({Title: 'Вход'});
    }

};

