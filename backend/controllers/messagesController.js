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
  

const updateMessageStatusByLender= async (req, res)=>{
  try{
    
    
    const {userId, borrowerId, userType, messageId}= req.body;
    //to update isLenderOk button on user document
  

     const user = await User.findOne({ _id: userId });
    //  console.log("userMessageUpdated:", user, "->messageId: ", messageId);
     const messageIndexU =  user.messages.findIndex(msg => msg.uniqueId === messageId);
     user.messages[messageIndexU].isLenderOk = true;
     await user.save();
    // console.log("messageupdatedsuccessfully: ", user);


  //updating on receivers end isLenderOk button
    const borrower= await User.findOne({_id:borrowerId});
    const messageIndexB= borrower.messages.findIndex(msg=> msg.uniqueId===messageId);
    borrower.messages[messageIndexB].isLenderOk=true;
    await borrower.save();
res.status(200).json({message: 'Message status updated successfully'});
}
 catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal server error'});
}
};

const updateMessageStatusByBorrower= async (req, res)=>{
  try{
   
    const {userId, lenderId, userType, messageId}= req.body;
    
    //to update isBorrowerOk button on user document
      const user= await User.findOne({_id: userId});
      const messageIndexU= user.messages.findIndex(msg => msg.uniqueId === messageId);
      user.messages[messageIndexU].isBorrowerOk= true;
     console.log("messageupdatedsuccessfully: ", user);


      await user.save();
  //updating on receivers end isBorrowerOK button
    const lender= await User.findOne({_id: lenderId});
    const messageIndexL= lender.messages.findIndex(msg => msg.uniqueId === messageId);
    lender.messages[messageIndexL].isBorrowerOk= true;
    await lender.save();
res.status(200).json({message: 'Message status updated successfully'});
}
 catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal server error'});
}
};
 module.exports= {getMessages, updateMessageStatusByLender, updateMessageStatusByBorrower};