const express= require("express");
const {getFriends}= require("../controllers/friendsController");

const router= express.Router();

//get all friends
router.get('/', getFriends);

module.exports= router;