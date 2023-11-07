const express = require('express');
const router= express.Router();
//import profile controller function
const {createProfile}= require('../controllers/profileController');

router.post('/createProfile', createProfile);

module.exports= router;