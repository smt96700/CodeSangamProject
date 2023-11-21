const jwt= require('jsonwebtoken');
const User= require('../models/userModel');

 const requireAuth= async (req, res, next)=>{
    //verify authorization
    //headers consist of bearer and token
    const {authorization}= req.headers;
    if(!authorization){
        return res.status(401).json({error: 'Authorization token is required'});
    }

    //destructring authorization
    const token = authorization.split(' ')[1];
    try{
      const {_id}= jwt.verify(token, process.env.SECRET);
      //find user
        req.user= await User.findOne({_id}).select('_id');
        next();
    }
    catch(error){
      
         console.log(error);
         res.status(401).json({error:'Request is not Authorized'});
    }
}

module.exports= requireAuth;