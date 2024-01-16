const express= require('express');
const passport = require('passport')
const router= express.Router();
const {loginUser, signupUser, logoutUser, googleAuthRedirect}= require('../controllers/userController');


//login route

router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser);
 
//logout route
router.post('/logout', logoutUser);

//auth with google
//passport at middle to send to google consent screen
router.get('/auth/google', passport.authenticate('google', {
        scope : ['profile', 'email']
}));

router.get('/auth/google/redirect', passport.authenticate('google', {
        
        successRedirect : "http://localhost:5173/wait",
        failureRedirect : "/fail",
}), async (req, res) => {
        console.log("req.user")
}


)  

router.get('/fail', async (req, res) => { 
        res.redirect('http://localhost:5173/login');
})

router.get('/wait', googleAuthRedirect)

// export router 
module.exports= router;