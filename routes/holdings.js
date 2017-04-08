const express = require('express');
const router = express.Router();
const request = require('request');
const async = require('async');


router
  .use((req, res, next) => {

    var options = {
      url: 'https://api.finect.com/v2/aggregation/users/' + req.cookies._fi_u + '/holdings',
      headers: { 'authorization': 'Bearer ' + req.cookies._fi_s }
    };

    request(options, function(error, response, body) {
      req.holdings = JSON.parse(body);
      next();
    });
  })
  .get('/', function (req, res) {
    res.render("holdings/index", {
      title : 'My holdings',
      holdings: req.holdings.data
    });
  })
  .get('/json', function (req, res) {
    res.send(req.holdings);
  })
  .get('/funds', function (req, res) {
    const funds = req.holdings.data.filter((item) => (item.asset.productTypeId == 100));


    const securityIds = funds.map(item => {
      return {
        idSecurity: item.asset.idSecurity,
        valueBaseCurrency: item.asset.valueBaseCurrency
      }
    });

    var response_array = [];
    async.each(funds, call_api, function(err){
      if (err) {
        return res.status(500).end();
      }
      res.render("holdings/funds/graph", {
        title : 'My funds graph',
        funds: funds,
        holdings: JSON.stringify(response_array)
      });
    });

    function call_api (item, callback) {
      var options = {
        url: 'https://api.finect.com/v2/market/funds/classes/' + item.asset.idSecurity + '/timeseries/return',
      };

      request(options, function(err, response, body) {
        if (err){return callback(err);}
        response_array.push({
          'securityId': item.asset.idSecurity,
          'valueBaseCurrency': item.asset.valueBaseCurrency,
          'originDescription': item.asset.originDescription,
          'timeseries': JSON.parse(body)
        });
        return callback();
      });
    }
  });



module.exports = router;
