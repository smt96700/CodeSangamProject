const User= require('../models/userModel');
const jwt= require('jsonwebtoken');

//function to create webtokens
const createToken= (_id)=>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d' }); //(payload, secret string, expiry period)
}
//login user

const loginUser= async (req, res)=>{

      const {email, password}= req.body;
    // res.json({mssg: 'login user'});
    try{
        const user= await User.signin(email, password);
        const token= createToken(user._id);
        const isFilledUserProfile= user.isFilledUserProfile;
        const userid= user._id;
        res.status(200).json({email, token, isFilledUserProfile, userid});
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

//sigup user
const signupUser= async (req, res)=>{
    const {email, password}= req.body;
     
    try{
        const user= await User.signup(email, password);
        // console.log(email, password); 
        //creating a token 
        const token= createToken(user._id);
        const isFilledUserProfile= user.isFilledUserProfile;
        const userid= user._id;
        // console.log(token);
        res.status(200).json({email, token, isFilledUserProfile, userid});

    }
    catch(error){
         res.status(400).json({error: error.message});
    }
    // res.json({mssg:'signup user'});
}

const logoutUser= async (req, res)=>{
    const {email}= req.body;
    try{
    const user= await User.signout(email);
    res.status(200).json(user);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}



const googleAuthRedirect = async (req, res) => {
    //handle passport
    
    // res.send(req.user) 

    console.log("inside wait: ", req.user)
    const user = req.user;
    const email = user.email;
    const token = createToken(user._id);
    const isFilledUserProfile = user.isFilledUserProfile;

    const userid = user._id;
    console.log("last")
    res.status(200).json({email, token, isFilledUserProfile, userid})
}

module.exports= {loginUser, signupUser, logoutUser, googleAuthRedirect};
