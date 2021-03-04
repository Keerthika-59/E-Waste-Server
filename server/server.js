
const express = require("express");
const app = express();
const PORT=process.env.PORT || 3000

app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin','*') ;
    res.header('Access-Control-Allow-Credentials',true);
    res.setHeader('Access-Control-Allow-Headers',"Origin, X-Requested-with,Content-Type,Accept,Authorization");
    res.setHeader('Access-Control-Allow-Headers','record-count,my-token,x-auth');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE,OPTIONS');
    next();
})

app.use(express.json());
app.use(express.urlencoded({extended:false}));
const hostname='localhost';

app.listen(PORT,hostname,()=>{
    // console.log(`server running at http://${hostname}:${PORT}/`);
    //Added new line
    //new comment..
    //added new line
    });


app.get('/',(req,res)=>{
   
    res.send("Hello world!!")
})