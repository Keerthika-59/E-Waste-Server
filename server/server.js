const express = require('express');
const cors = require('cors');
const app = express();
// require('dotenv').config();
const {uri} = require('./config/config.js');

app.use(function(req,res,next){
    res.header('Access-Control-Allow-Credentials',true);
    res.header('Access-Control-Allow-Origin','*') ; 
    res.setHeader('Access-Control-Allow-Headers',"Origin, X-Requested-with,Content-Type,Accept,Authorization");
    res.setHeader('Access-Control-Allow-Headers','record-count,my-token,x-auth');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE,OPTIONS');
    next();
})

const port = process.env.PORT || 5000;

// http://localhost:5000/reps/add

app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

require('./config/config.js');
require('../server/routes/contactRoute.js')(app);
require('../server/routes/userActivityRoute.js')(app);

app.use("/auth1",require("./routes/userRoute"))
app.use('/admin', require('./routes/admin.route'));

app.use("/reps",require("./routes/repRoute"))
app.use(express.static('images'));

app.get('/', (req, res) => {
    res.json({
        msg : 'Hello World'
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
