const express= require("express");
const {getMessages, updateMessageStatusByLender, updateMessageStatusByBorrower}= require("../controllers/messagesController");

const router= express.Router();

//get all friends
router.get('/', getMessages);
router.put('/updateMessageStatusByLender', updateMessageStatusByLender);
router.put('/updateMessageStatusByBorrower', updateMessageStatusByBorrower);

module.exports= router;