const express = require('express');
<<<<<<< HEAD

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
=======
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const dbConfig = require('./config/config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, { useUnifiedTopology: true }, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({ "message": "Welcome!" });
});
>>>>>>> pooja-proj

require('../server/routes/contactRoute.js')(app);
require('../server/routes/userRoute.js')(app);

<<<<<<< HEAD

=======
>>>>>>> pooja-proj
app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});