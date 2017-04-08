const express = require('express');
const router = express.Router();
const request = require('request');

router
  .get('/', function (req, res) {
    const _fi_s = req.cookies._fi_s;
    const _fi_u = req.cookies._fi_u;

    var options = {
      url: 'https://api.finect.com/v2/aggregation/users/' + _fi_u + '/banks',
      headers: {
        'authorization': 'Bearer ' + _fi_s
      }
    };

    function callback(error, response, body) {
      const inner = {
        cookies : {
          _fi_s,
          _fi_u
        },
        holdings: JSON.parse(body)
      };

      res.send(inner);
    };

    request(options, callback);
  });



module.exports = router;
