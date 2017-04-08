const express = require('express');
const router = express.Router();
const request = require('request');

router
  .get('/returns', function (req, res) {
    const productType = req.query.productType;

    const _fi_s = req.cookies._fi_s;
    const _fi_u = req.cookies._fi_u;

    var options = {
      url: 'https://api.finect.com/v2/aggregation/community/returns?productType=' + productType + '&timePeriod=M60&source=FINECT',
      headers: {
        'authorization': 'Bearer ' + _fi_s
      }
    };

    function callback(error, response, body) {
      res.send(JSON.parse(body));
    };

    request(options, callback);
  })
  .get('/assets', function (req, res) {
    const _fi_s = req.cookies._fi_s;
    const _fi_u = req.cookies._fi_u;

    var options = {
      url: 'https://api.finect.com/v2/aggregation/community/assets',
      headers: {
        'authorization': 'Bearer ' + _fi_s
      }
    };

    function callback(error, response, body) {
      res.send(JSON.parse(body));
    };

    request(options, callback);
  })
  .get('/categories/assets', function (req, res) {
    const scope = req.query.scope;
    const assetType = req.query.assetType;


    const _fi_s = req.cookies._fi_s;
    const _fi_u = req.cookies._fi_u;

    var options = {
      url: 'https://api.finect.com/v2/aggregation/community/categories/assets?scope=' + scope + '&assetType=' + assetType + '&source=EUROBITS',
      headers: {
        'authorization': 'Bearer ' + _fi_s
      }
    };

    function callback(error, response, body) {
      res.send(JSON.parse(body));
    };

    request(options, callback);
  })
  .get('/funds/rankings', function (req, res) {
    const by = req.query.by;
    const assetType = req.query.assetType;

    const _fi_s = req.cookies._fi_s;
    const _fi_u = req.cookies._fi_u;

    var options = {
      url: 'https://api.finect.com/v2/aggregation/community/funds/rankings?by=' + by + '&assetType=' + assetType,
      headers: {
        'authorization': 'Bearer ' + _fi_s
      }
    };

    function callback(error, response, body) {
      res.send(JSON.parse(body));
    };

    request(options, callback);
  })










  ;



module.exports = router;
