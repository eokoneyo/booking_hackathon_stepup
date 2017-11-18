'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cons = require('consolidate');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect('mongodb://localhost:27017/step_up', {
  useMongoClient: true
});

require('routes/')(app);

app.listen(PORT, ()=> {

    console.log(`App is listening on ${PORT} `);

});

module.exports = app;
