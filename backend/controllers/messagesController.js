const User= require('../models/userModel');

const getMessages = async (req, res) => {
    try {
      const { userid } = req.headers;
      const user = await User.findById(userid);
  
      // Retrieve the friends array
      const messages = user.messages;
  
      // Iterate through each friend and fetch additional information
  
    //   console.log(friends);
      res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
 module.exports= {getMessages};