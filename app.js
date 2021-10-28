const express = require('express');
const app = express();


const productRouter = require('./routers/productRouter');

app.use(`/products`,productRouter);

module.exports = app;
