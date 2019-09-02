/**
 * PageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let samp_query = require('samp-query');
const nodemailer = require("nodemailer");
const request = require('request');
module.exports = {
    mailer: async (req, res) => {
        console.log('mail calling')
        let to = req.params.email;
        let code = req.params.code;
        await Accounts.find({email: to}).exec(async (err, results) => {

            if(results[0].sendmail) {
                // create reusable transporter object using the default SMTP transport
                await Accounts.updateOne({email: to}).set({sendmail: 0});
                let transporter = nodemailer.createTransport({
                    host: "server131.hosting.reg.ru",
                    port: 465,
                    secure: 'ssl', // true for 465, false for other ports
                    auth: {
                        user: 'support@makkord.com', // generated ethereal user
                        pass: 'Y2s9D0b2' // generated ethereal password
                    }
                });

                // setup email data with unicode symbols
                let mailOptions = {
                    from: '"Makkord RolePlay - Техническая поддержка"<support@makkord.com>', // sender address
                    to: to, // list of receivers
                    subject: "Makkord RolePlay - Техническая поддержка", // Subject line
                    text: "Cообщение было сгенирировано автоматически и не требует ответа. Код: "+code+"", // plain text body
                    html: "<div style='background-image:url(http://makkord-rp.ru/assets/images/lk.jpg);padding-bottom:15%'>\n" +
                        "    <div style='padding-left:40%; padding-right: 40%;'>\n" +
                        "        <a href='http://makkord-rp.ru'><img style='height: 200px;padding-left: 4%;padding-top: 45%' src='http://makkord-rp.ru/assets/images/logo.png'></a><br><br><br>\n" +
                        "    </div>\n" +
                        "    <div style='width: 18%; height: 6%; background-color: #333; border: 2px solid #dd163b;padding-left:2%; padding-right: 2%;margin-left:38%; '>\n" +
                        "        <h4 style='color: #FFFFFF;padding-left: 3%;padding-bottom: 4%'>Makkord RolePlay - Техническая поддержка</h4>\n" +
                        "    </div>\n" +
                        "    <br>\n" +
                        "    <div style='width: 40%; height: auto;  background-color: #333; border: 2px solid #dd163b;margin-left: 30%;'>\n" +
                        "        <h4 style='color: #FFFFFF;padding-left: 9%;padding-bottom: 4%'>Cообщение было сгенирировано автоматически и не требует ответа. Код: <span style=\"color: #dd163b; font-size: 19px;\">" + code + "</span></h4>\n" +
                        "    </div>\n" +
                        "</div>"// html body
                };

                // send mail with defined transport object
                let info = await transporter.sendMail(mailOptions)
                res.send('Ok');
                console.log("Message sent: %s", info.messageId);
            }
            else {res.send('No access')}
        });


    },
    main: async (req,res)=> {
        const options = {
            host: 'm-mp.ru',
            port: 8904
        };
        await samp_query(options, function (error, response) {
            if (error)
                console.log(error);
            else
            {
                res.view({
                    Title: 'Главная',
                    Online: response.online
                })
            }
        });
    },
    start: function (req,res){
        res.view({
            Title: 'Как начать играть',
        });
    },
    about: function (req,res){
        res.view({
            Title: 'О проекте',
        });
    },
    news: async (req, res) => {

        res.view({
            Title: 'Новости',
        });

    },
    online: async (req, res) => {
      let servers = '';
      request.get('https://crmp.samp-sc.com/cache/graph_groups.json?'+ Math.floor(Date.now() / 1000), async (error, response, body) => {
        servers = JSON.parse(body);

        servers.pop();
        servers.pop();
        res.view({
          servers: servers,
          Title: 'Online',
          layout: 'layouts/none'
        })
      });

    }
};

