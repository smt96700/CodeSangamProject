const User= require('../models/userModel');

//cb is callback which is called when addFriend excutes
module.exports.addFriend= async (socket, friendName, cb)=>{
    console.log(friendName, socket.username);
    //friendName is username
    if(socket.username=== friendName){
        console.log("Cannot add self");
        cb({done: false, errorMsg: "Can't add self to Friends"})
        return;
    }
    const friendUser= await User.findOne({email:friendName});
  
    
    if(!friendUser){
         cb({done:false, errorMsg: "Username does not exist"});
         return;
    }
    const friendUserId= friendUser._id;
    console.log(friendUserId);
    //check if friend is present in user's friends array of client(main user)
    const user= await User.findOne({email: socket.username});
    const currentFriendList= user.friends;
    console.log(currentFriendList.includes(friendName));
    if(currentFriendList.length>0 && currentFriendList.includes(friendName)){
        cb({done:false, errorMsg: "Friend is already added"});
        return;
    }
    console.log(user);
   
    await User.findOneAndUpdate(
        { email: socket.username }, // Query to find the user by ID
        { $push: { friends: { username: friendName, connected: friendUser.connected } } }, // Use $push to add the new friend to the array
        { new: true } // To return the updated document
      )
    cb({done: true});

}
