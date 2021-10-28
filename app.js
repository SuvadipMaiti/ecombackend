const express = require('express');
const app = express();

//prefex url in env file
require('dotenv/config');
const api = process.env.API_URL;

const productRouter = require('./routers/productRouter');

app.use(`${api}/products`,productRouter);

module.exports = app;
