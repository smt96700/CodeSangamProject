const mongoose= require('mongoose');
const bcrypt= require('bcrypt');
const validator= require('validator') //to check a strong password and valid mail
const Schema= mongoose.Schema;


const userSchema= new Schema({
    isFilledUserProfile:{
        type: Boolean,
        default: false
    },  
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String, 
        required: true
    }
}, {timestamps:true});

//signup static model like User.save()
userSchema.statics.signup= async function(email, password){
     
    //check if mail and password field are filled
    if(!email || !password){
        throw Error('All fields must be filled');
    }
    //valid mail check
    if(!validator.isEmail(email)){
        throw Error('Not a valid email id');
    }
    //strong password check
    if(!validator.isStrongPassword(password)){
        throw Error('Not strong enough');
    }
    const exists= await this.findOne({email});
    if(exists){
        throw Error('Email already registered');
    }
    //generate salt
    const salt= await bcrypt.genSalt(10);
    const hash= await bcrypt.hash(password, salt);
    const user = await this.create({email, password: hash});
    return user;

}

// sign in static model
userSchema.statics.signin= async function(email, password){
       if(!email || !password){
        throw Error('All field must be filled');
       }

       const user= await this.findOne({email});
       if(!user){
        throw Error('Invalid user');
       }
       const match= await bcrypt.compare(password, user.password);
       if(!match){
        throw Error('Incorrect password');
       }
       return user;
}
module.exports= mongoose.model('User', userSchema);