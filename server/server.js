const express = require('express');

const app = express();
const PORT = 3000;

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-with,Content-Type,Accept,Authorization");
    res.setHeader('Access-Control-Allow-Headers', 'record-count,my-token,x-auth');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    next();
})

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
const info = require('./data.js')
const hostname = 'localhost';

app.get('/', (req, res) => {
        res.json(info.data);
})

app.listen(PORT, hostname);
