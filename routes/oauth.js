const express      = require('express');
const router       = express.Router();
const request      = require('request');

const config       = require('../config');

router
  .get('/info', function (req, res) {
    const _fi_s = req.cookies._fi_s;
    var options = {
      url: 'https://login.finect.com/oauth/tokenInfo',
      headers: {
        'authorization': 'Bearer ' + _fi_s
      }
    };
    function callback(error, response, body) {
      res.send(body);
    };
    request(options, callback);
  })
  .get('/oauth', function(req, res) {
    const code = req.query.code;

    const url = 'https://login.finect.com/oauth/token';
    const json = {
      code,
      redirect_uri: 'http://' + config.endpoint + '/oauth',
      client_id: config.client,
      client_secret: 'borjamiguel',
      grant_type: 'authorization_code'
    };

    request.post({url, json}, function(error, response, body) {
      // console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', body); // Print the response status code if a response was received

      if(error) {
        res.send(error);
      } else {
        res.cookie('_fi_s', body.access_token, { maxAge: 9000000, httpOnly: true });
        res.cookie('_fi_u', body.user_uuid, { maxAge: 9000000, httpOnly: true });

        res.redirect('/');
      }
    });

  });



module.exports = router;
