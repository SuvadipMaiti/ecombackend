const express = require('express');
const app = express();
//json fetch
const bodyParser = require('body-parser');
//rest api data in log
const morgan = require('morgan');
const cors = require('cors');

//https://github.com/bhaikaju/mega-back/blob/master/config/helpers.js
//https://github.com/bhaikaju/mega-front
//https://www.youtube.com/watch?v=38L3E-Zrswo&list=PLG3j59vX4yLHA-wCw7KDP-i0r10ZrckqG&index=2
/* CORS */
app.use(cors({
    origin: '*',
    methods: ['GET', 'PUT', 'DELETE', 'PATCH', 'POST'],
    allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept'
}));

//prefex url in env file
require('dotenv/config');
const api = process.env.API_URL;

const productRouter = require('./routers/productRouter');
const userRouter = require('./routers/userRouter');
const imageUploadRouter = require('./routers/imageUploadRouter');


app.use(express.json());
app.use(morgan('tiny'));

app.use('/uploads', express.static('public/uploads'));

app.use(`${api}/products`, productRouter);
app.use(`${api}/users`, userRouter);
app.use(`${api}/images`, imageUploadRouter);

module.exports = app;