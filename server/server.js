const express = require('express');

const app = express();
const PORT = 3000;


app.use(function(req, res, next) {
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
    res.send(data);
})

require('../server/routes/contactRoute.js')(app);
require('../server/routes/userRoute.js')(app);


app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});