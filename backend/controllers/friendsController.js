const User= require('../models/userModel');

//get all friends
// const getFriends= async (req, res)=>{
//    const {userid}= req.headers;
//    const user= await User.findById(userid);
//    const friends= user.friends;


//    console.log(friends);
//    res.status(200).json(friends);
// }


const getFriends = async (req, res) => {
   try {
     const { userid } = req.headers;
     const user = await User.findById(userid);
 
     // Retrieve the friends array
     const friends = user.friends;
 
     // Iterate through each friend and fetch additional information
     for (let i = 0; i < friends.length; i++) {
       const friend = friends[i];
       const friendUser = await User.findOne({ email: friend.username });
 
       // If the friend user is found, update the connected value
       if (friendUser) {
        friends[i].username= friendUser.email;
         friends[i].connected = friendUser.connected;
       }
       // If the friend user is not found, you might want to handle this case accordingly
       // For example, set connected to false or do nothing depending on your requirements
     }
 
     console.log(friends);
     res.status(200).json(friends);
   } catch (error) {
     console.error('Error fetching friends:', error);
     res.status(500).json({ error: 'Internal Server Error' });
   }
 };
 
module.exports= {getFriends};