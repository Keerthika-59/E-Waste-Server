const auth =(req,res,next)=>{
    try{
        console.log(req.cookies);
    }catch(err){
        console.log(err.message);
        res.status(401).json({message:"Unauthorized"})
    }

}
module.exports =auth