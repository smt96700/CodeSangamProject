require("dotenv").config();

//require passport
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User= require('../models/userModel');

passport.serializeUser((user, done) => {
    console.log("Inside serialize user")
    done(null, user._id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })  
})

passport.use(
    new GoogleStrategy({
        //options for google strategy..
  
        callbackURL : '/api/user/auth/google/redirect',
        clientID : process.env.CLIENTID,
        clientSecret : process.env.CLIENTSECRET  


    }, (accessToken, refreshToken, profile, email, done) => {
        //passport callback fn
        console.log(email.emails[0].value);

        const userEmail = email.emails[0].value;
        //check if user already exists
        //callback fn
        User.findOne({email: userEmail}).then( (currUser) => {
            if(currUser) {
                //user present in database
                console.log("old user: " + currUser)
                return done(null, currUser)
            } else {
                //create new user
                const password = "Test@123"
                User.signup(userEmail, password).then((user) => {
                    console.log("new user: " + user)
                    return done(null, user)
                }).catch((err) => {
                    console.error("Error creating new user: " + err);
                    return done(err, null);
                });
            }
        })


    })
)
