const express = require('express');
const router = express.Router();
const request = require('request');



router
  .use((req, res, next) => {

    var options = {
      url: 'https://api.finect.com/v2/aggregation/users/' + req.cookies._fi_u + '/holdings/timeseries',
      headers: { 'authorization': 'Bearer ' + req.cookies._fi_s }
    };

    request(options, function(error, response, body) {
      req.holdings = JSON.parse(body);
      next();
    });
  })
  .get('/', function (req, res) {
    res.send(req.holdings);
  });

module.exports = router;
