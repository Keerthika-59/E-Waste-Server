const mongoose = require('mongoose');
    
const MONGO_URI = "mongodb+srv://admin:admin@ewaste.aztcn.mongodb.net/ewastemanagement";

mongoose.connect(MONGO_URI, 
{   useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify : false,
    useCreateIndex : true 
})

.then((msg) => {
    console.log('Database connected successfully');
})
.catch( err => {
    console.log('Database Connection Failed');
} )
