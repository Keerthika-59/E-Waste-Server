// const bodyParser = require('body-parser');

// const app = express();

// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())

// const dbConfig = require('./config/config.js');
// const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

// mongoose.connect(dbConfig.url, { useUnifiedTopology: true }, {
//     useNewUrlParser: true
// }).then(() => {
//     console.log("Successfully connected to the database");
// }).catch(err => {
//     console.log('Could not connect to the database', err);
//     process.exit();
// });

// app.get('/', (req, res) => {
//     res.json({ "message": "Welcome!" });
// });

// require('../server/routes/contactRoute.js')(app);
// require('../server/routes/userActivityRoute.js')(app);

// require('../server/routes/userRoute.js')(app);
// require('../server/routes/repRoute.js')(app);

// app.listen(3000, () => {
//     console.log("Server is listening on port 3000");
// });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
// require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const uri = 'mongodb://localhost:27017/EWaste';
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('mongo DB success');
});

require('../server/routes/contactRoute.js')(app);
require('../server/routes/userActivityRoute.js')(app);
require('../server/routes/userRoute.js')(app);
//require('../server/routes/repRoute.js')(app);
const repRouter = require('../server/routes/repRoute');
app.use('/reps', repRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})