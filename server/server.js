
const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const dbConfig = require('./config/config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url,{ useUnifiedTopology: true }, {
   useNewUrlParser: true
}).then(() => {
   console.log("Successfully connected to the database");
}).catch(err => {
   console.log('Could not connect to the database', err);
   process.exit();
});

app.get('/', (req, res) => {
   res.json({"message": "Welcome!"});
});


require('../server/routes/contactRoute.js')(app);

app.listen(5000, () => {
   console.log("Server is listening on port 5000");
});



require('../server/routes/contactRoute.js')(app);
require('../server/routes/userRoute.js')(app);
require('../server/routes/userActivityRoute.js')(app);

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
// >>>>>>> Stashed changes
// =======
// const express = require("express");
// const mongoose = require("mongoose");
// const app = express();
// const cors = require("cors");
// const cookieParser=require("cookie-parser")

// app.use(cors(
//   {
//   origin:["http://localhost:3000"],
//   credentials:true
// }));
// const PORT = 8080;

// // app.use(function (req, res, next) {
// //   res.header("Access-Control-Allow-Origin", "*");
// //   res.header("Access-Control-Allow-Credentials", true);
// //   res.setHeader(
// //     "Access-Control-Allow-Headers",
// //     "Origin, X-Requested-with,Content-Type,Accept,Authorization"
// //   );
// //   res.setHeader("Access-Control-Allow-Headers", "record-count,my-token,x-auth");
// //   res.setHeader(
// //     "Access-Control-Allow-Methods",
// //     "GET,POST,PUT,PATCH,DELETE,OPTIONS"
// //   );
// //   next();
// // });

// app.use(express.json());
// app.use(cookieParser())

// app.use(express.urlencoded({ extended: false }));
// const { data } = require("./data.js");
// const hostname = "localhost";

// app.get("/", (req, res) => {
//   res.send(data);
// });

// app.listen(PORT, hostname, () => {
//   console.log(`Server has started on ${hostname}:${PORT}`);
// });

// mongoose.connect(
//   "mongodb://localhost:27017/ewaste",
//   { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
//   (err) => {
//     if (err) return console.error(err);
//     console.log("Connected to MongoDB");
//   }
// );

// app.use("/auth",require("./routes/userRouter"))
// >>>>>>> Stashed changes
