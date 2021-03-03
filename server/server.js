const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

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
const { data } = require('./data.js')
const hostname = 'localhost';

app.get('/', (req, res) => {
    try {
        res.send(data);

    } catch (error) {
        res.send({
            message: 'Error handling Get Request'
        })
    }
})

app.listen(PORT, hostname);
