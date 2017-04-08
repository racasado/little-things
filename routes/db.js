const express      = require('express');
const router       = express.Router();
const request      = require('request');
const mysql        = require('mysql');

var config = {
  host     : '104.196.70.237',
  user     : 'rafa',
  password : 'ribadese',
  database : 'finect'
};

if(process.env.NODE_ENV === 'production') {
  var config = {
    user       : 'rafa',
    password   : 'ribadese',
    database   : 'finect',
    socketPath : '/cloudsql/micappital:us-east1:micappital-db'
  };
}

router
  .get('/db', function(req, res) {

    var connection = mysql.createConnection(config);
    connection.connect();
    connection.query('SELECT * FROM finect.users_table', function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });

    connection.end();
  });




module.exports = router;
