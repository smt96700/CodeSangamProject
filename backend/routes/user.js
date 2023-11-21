const express= require('express');
const router= express.Router();
const {loginUser, signupUser, logoutUser}= require('../controllers/userController');
//login route
 
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser);

//logout route
router.post('/logout', logoutUser);


// export router
module.exports= router;