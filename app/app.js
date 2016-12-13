const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('../config.js');

var app = express();

app.set('port', config.PORT );
app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.locals.pageTitle = "Primary Book Club";

app.use(express.static('app/public'));
app.use(bodyParser());
app.use(require('./routes/router'));


var server = app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});

mongoose.connect(config.DATABASE_URL)

module.exports = server;
