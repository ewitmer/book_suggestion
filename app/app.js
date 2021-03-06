const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('port', process.env.PORT || 3000 );
app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.locals.pageTitle = "Primary Book Club";

app.use(express.static('app/public'));
app.use(bodyParser());
app.use(require('./routes/router'));


const server = app.listen(app.get('port'), () => {
  console.log('Listening on port ' + app.get('port'));
});

mongoose.connect(process.env.DATABASE_URL)

module.exports = server;
