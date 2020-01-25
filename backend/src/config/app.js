const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

//Initialize
const app = express();
require('./database');

//Settings
app.set('port', process.env.PORT || 4000);

//Midleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//Static File
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/api', require('../routes'));

module.exports = app;