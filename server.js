'use strict';

global.__SERVER__ = true;

const express = require('express');
const bodyParser = require('body-parser');
const cons = require('consolidate');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');


// assign the dust engine to .dust files
app.engine('dust', cons.dust);
app.set('view engine', 'dust');

//serve public assets
app.use(express.static('./public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect('mongodb://localhost:27017/step_up');

require('routes/')(app);

app.listen(PORT, () => {

    console.log(`App is listening on ${PORT} `);

});

module.exports = app;
