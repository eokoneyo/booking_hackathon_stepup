'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cons = require('consolidate');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

require('routes/')(app);

app.listen(PORT, ()=> {

    console.log(`App is listening on ${PORT} `);

});

module.exports = app;