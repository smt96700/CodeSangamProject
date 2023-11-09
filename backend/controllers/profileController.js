
const User= require('../models/userModel');
const Profile = require("../models/profileModel");

//function to create a new profile
const createProfile = async function (req, res) {
  const {
    name,
    gender,
    dateOfBirth,
    contactNumber,
    currency,
    monthlySalary,
    monthlyExpense,
    country,
    state,
    city,
    email
  } = req.body;

  const emptyFields = [];
  if (!name) {
    emptyFields.push("name");
  }

  if (!gender) {
    emptyFields.push("gender");
  }
  if (!dateOfBirth) {
    emptyFields.push("dateOfBirth");
  }
  if (!contactNumber) {
    emptyFields.push("contactNumber");
  }
  if (!currency) {
    emptyFields.push("currency");
  }
  if (!monthlySalary) {
    emptyFields.push("monthlySalary");
  }
  if (!monthlyExpense) {
    emptyFields.push("monthlyExpense");
  }
  if (!country) {
    emptyFields.push("country");
  }
  if (!state) {
    emptyFields.push("state");
  }
  if (!city) {
    emptyFields.push("city");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    // const user_id = req.user._id;
    const profile = await Profile.create({
        name,
        gender,
        dateOfBirth,
        contactNumber,
        currency,
        monthlySalary,
        monthlyExpense,
        country,
        state,
        city,
        email
    });
    const user= await User.findOneAndUpdate({email: email}, { $set: { isFilledUserProfile: true } });
    res.status(200).json(profile);
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

};

module.exports= {createProfile};