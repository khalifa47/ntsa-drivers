const express = require('express');
require('express-async-errors')
const cors = require('cors');
const router = require('./routes');
const { ErrorMiddleware } = require('./http/middleware/error.middleware');
const { json, urlencoded } = require('express');

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({extended: false}));

app.use(router);
app.use(ErrorMiddleware);

module.exports = app

