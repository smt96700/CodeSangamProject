const express= require("express");
const {getMessages}= require("../controllers/messagesController");

const router= express.Router();

//get all friends
router.get('/', getMessages);

module.exports= router;