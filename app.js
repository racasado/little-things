const express      = require('express');
const request      = require('request');
const cookieParser = require('cookie-parser')

const funds        = require('./routes/funds');
const mifunds      = require('./routes/mifunds');
const miequities   = require('./routes/miequities');
const miplans      = require('./routes/miplans');
const banks        = require('./routes/banks');
const holdings     = require('./routes/holdings');
const holdings_timeseries     = require('./routes/holdings_timeseries');
const transactions = require('./routes/transactions');
const community    = require('./routes/community');
const db           = require('./routes/db');
const oauth        = require('./routes/oauth');
const config       = require('./config');

const app = express();
const staticAssets = __dirname + "/public";

app
  .set("views", __dirname + "/views")
  .set("view engine", "hjs")
  .use(cookieParser())
  .use(express.static(staticAssets))
  .use('/holdings', holdings)
  .use('/holdings/timeseries', holdings_timeseries)
  .use('/transactions', transactions)
  .use('/banks', banks)
  .use('/mifunds', mifunds)
  .use('/miplans', miplans)
  .use('/miequities', miequities)
  .use('/funds', funds)
  .use('/community', community)
  .use(db)
  .use(oauth)
  .get('/', function (req, res) {
    const title = process.env.NODE_ENV;
    const _fi_s = req.cookies._fi_s;
    var authenticated = false;

    var options = {
      url: 'https://login.finect.com/oauth/tokenInfo',
      headers: {
        'authorization': 'Bearer ' + _fi_s
      }
    };
    function callback(error, response, body) {
      if(response && response.statusCode === 200) {
        if(JSON.parse(body).expiresIn > 0) {
          authenticated = true;
        }
      }

      res.render("index", {
        title,
        cookie: _fi_s,
        endpoint: config.endpoint,
        client: config.client,
        authenticated,
        partials: {user_login: "user_login"}
      });

    };
    request(options, callback);
});


app.set('port', process.env.PORT || 8081);
app.listen(app.get('port'), function () {
  console.log('App started listening on port ' + app.get('port') + '!');
});
