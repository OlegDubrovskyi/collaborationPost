"use strict";

var express = require('express');
var app = express();

app.use(express.bodyParser());

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-XSRF-TOKEN');
  next();
};

app.use(allowCrossDomain);

// Port where we'll run the websocket server
var serverPort = 3200;

app.use(express.static('./public'));

/**
 * Global variables
 */

var
  starsState = new Array(100).fill(0);

app.get('/collaboration', function(req, res) {
  var index = req.query.n;
  var status =  req.query.s;

  starsState[index] = status == 0 ? 0 : 1;

  res.setHeader('Content-Type', 'text/plain');
  res.send(starsState.join(''));
});

app.post('/collaboration', function(req, res) {
  var index = req.body.n;
  var status =  req.body.s;

  starsState[index] = status == 0 ? 0 : 1;

  res.setHeader('Content-Type', 'text/plain');
  res.send(starsState.join(''));
});

var server = app.listen(serverPort, function() {
  console.log((new Date()) + " Server is listening on port " + serverPort);
});
