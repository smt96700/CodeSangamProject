const express = require('express');
const router= express.Router();
//import profile controller function
const {createProfile, getProfile}= require('../controllers/profileController');

router.post('/createProfile', createProfile);
router.get('/getProfile', getProfile)

module.exports= router;