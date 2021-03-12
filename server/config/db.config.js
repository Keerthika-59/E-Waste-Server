const mongoose = require('mongoose');

const username = 'mern';
const password = 'admin';
const MONGO_URI = `mongodb+srv://username:password@ewastecluster.sbacp.mongodb.net/ewastedb`;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    
}).then(() => {
    console.log(`Connected Successfully`);
}).catch((err) => {
    console.log(`Cannot connect`);
})