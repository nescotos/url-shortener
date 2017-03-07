const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const cors = require('cors');

mongoose.connect(`${config.DATABASE.HOST}${config.DATABASE.NAME}`);
mongoose.Promise = global.Promise;
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let urlRouter = require('./routes/url.router')(express);
app.use('/api', urlRouter);

app.listen(config.PORT, () => {
  console.log(`Server Running on Port # ${config.PORT}`);
});

module.exports = app;
