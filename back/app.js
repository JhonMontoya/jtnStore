//import express from 'express';
const express = require('express');
const dotenv = require('dotenv');
const cors  = require('cors');

const http = require('http');
const bodyParser = require('body-parser');

const connectDB = require('./config/dataBase');
const routerUser = require('./routes/user');
const routerProduct = require('./routes/product');

dotenv.config();

const app = express();
const server = http.createServer(app);

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/usuarios', routerUser);
app.use('/productos', routerProduct);

server.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});