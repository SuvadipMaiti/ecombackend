const express = require('express');
const app = express();
//json fetch
const bodyParser = require('body-parser');
//rest api data in log
const morgan = require('morgan');


//prefex url in env file
require('dotenv/config');
const api = process.env.API_URL;

const productRouter = require('./routers/productRouter');


app.use(express.json());
app.use(morgan('tiny'));


app.use(`${api}/products`, productRouter);

module.exports = app;