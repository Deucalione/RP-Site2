/**
 * ApiController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let samp_query = require('samp-query');
const fs = require('fs')
module.exports = {

    getservers: async (req, res) => {
        let servers = []
        const options = {
            host: 'm-mp.ru',
            port: 8904
        };
        const options1 = {
            host: '217.106.104.154',
            port: 7777
        };
        await samp_query(options, async function (error, response) {
            if (error)
                console.log(error);
            else
            {
                await samp_query(options1, function (error, response1) {
                    if (error)
                        console.log(error);
                    else
                    {
                        servers.push(response)
                        servers.push(response1)
                        res.json(servers)
                    }
                });
            }
        });
    },

    getnews: async (req, res) => {
        let news = await News.find().limit(3).sort('id ASC')

        return res.json(news)
    }

};
