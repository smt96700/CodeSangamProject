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
    console.log(currentFriendList);

    console.log(currentFriendList.some(item => item.username === friendName));
    if(currentFriendList.length>0 && currentFriendList.some(item => item.username === friendName)){
        cb({done:false, errorMsg: "Friend is already added"});
        return;
    }
    console.log(user);
   
    await User.findOneAndUpdate(
        { email: socket.username }, // Query to find the user by ID
        { $push: { friends: { username: friendName, connected: friendUser.connected , userid: friendUser._id.toString()} } }, // Use $push to add the new friend to the array
        { new: true } // To return the updated document
      )
      await User.findOneAndUpdate(
        { email: friendUser.email }, // Query to find the user by ID
        { $push: { friends: { username: user.email, connected: user.connected , userid: user._id.toString()} } }, // Use $push to add the new friend to the array
        { new: true } // To return the updated document
      )
    const newFriend= {
        username: friendName,
        userid: friendUser.userid,
        connected: friendUser.connected
    }
    cb({done: true, newFriend});

}


//disconnecting socket 
// module.exports.onDisconnect= async (socket)=>{
//     await User.findOneAndUpdate(
//         { email: socket.username }, // Query to find the user by ID
//         {connected: false}
//       )
// }

module.exports.dm= async (io, userSocketMap, socket, message)=>{
     message.from= socket.userid;

     //to from content
     const user=await User.findOneAndUpdate(
        { email: socket.username }, // Query to find the user by ID
        { $push: { messages: { to: message.to, from: message.from, content: message.content} } }, // Use $push to add the new friend to the array
        { new: true } // To return the updated document
      )

      const friend=await User.findOneAndUpdate(
        { _id: message.to }, // Query to find the user by ID
        { $push: { messages: { to: message.to, from: message.from, content: message.content} } }, // Use $push to add the new friend to the array
        { new: true } // To return the updated document
      )
      console.log("message user: ", message.to);
      console.log("message friend", message.from);
      // Update the recipient's messages with the sent message
       const recipientSocketId = userSocketMap.get(message.to);
      //confirmation to client
      console.log("message to", message.to);
      console.log("UserSocketMap:", userSocketMap);
      socket.to(recipientSocketId).emit('dm', message);

}

//intialisier
module.exports.initializeUser= async (userSocketMap, socket) => {
    const user= await User.findOneAndUpdate({email: socket.username}, {connected: true});
    const friendRooms = await user.friends.map((friend) => userSocketMap.get(friend.userid));
    console.log("friendRooms: ", friendRooms);

    //emit to all friends
    if(friendRooms.length >0 ){
    socket.to(friendRooms).emit("connected", true, socket.username);
    }
    const messages= user.messages;
    // Sort the messages array by createdAt in descending order
     messages.sort((a, b) => b.createdAt - a.createdAt);
    // console.log("messages in intialiser: ", messages);
    if(messages && messages.length >0 ){
        socket.emit("messages", messages);
    }
}

module.exports.onDisconnect= async (userSocketMap, socket)=>{
    const user= await User.findOneAndUpdate({email: socket.username}, {connected: false}, {new: true});
    
    const friendRooms = await user.friends.map((friend) => userSocketMap.get(friend.userid));
    console.log("friendRooms on Disconnect: ", friendRooms);

    //emit to all friends
    socket.to(friendRooms).emit("connected", false, socket.username);
}