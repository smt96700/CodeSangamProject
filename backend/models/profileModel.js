const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      default: 'inr',
    },
    monthlySalary: {
      type: Number,
      required: true,
    },
    monthlyExpense: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    // Additional fields can be added here as needed
  },
  { timestamps: true }
);

//static function for submitting
// profileSchema.statics.setProfile= async function(name, gender, dateOfBirth, contactNumber, currency, monthlySalary,monthlyExpense, country, state, city){
//     const allFieldsFilled= (!name || !gender || dateOfBirth || contactNumber || currency || monthlySalary || monthlyExpense || country || state || city);

//     if(allFieldsFilled){
//        throw Error('All fields must be filled');
//     }

// }

module.exports= mongoose.model('Profile', profileSchema);
