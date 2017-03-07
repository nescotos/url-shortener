const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const base58 = require('base58');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const cors = require('cors');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(config.PORT, () => {
  console.log(`Server Running on Port # ${config.PORT}`);
});
