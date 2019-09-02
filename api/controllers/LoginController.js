const sha1 = require('sha1')

module.exports = {
  post: async (req, res) => {
    console.log('test');

    console.log(req.allParams());
    const {name, password} = req.allParams();

    console.log('Name: ' + name + '\nPassword: '+ password);

    let count = await Accounts.find();

    console.log(count);

    Accounts.findOne({name: name}).exec(function (err, user) {
      console.log(user)
      if (!user || err) console.log(err);
      if (user.password === sha1(password)) {
        // Авторизовать пользователя в сессии
        // Дать доступ к дан   ным авторизованного
        // пользователя из сессии
        sails.log.info('User logged in', user)

        return res.json({
          xToken: TokenService.issue({id: user.id}),
          cookie: CryptographyService.encrypt(user.id)
        })

        /*if (req.session.User.admlvl) {
            return res.redirect('/admin');
        }*/
      }
    });
  }
}
