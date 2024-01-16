import { TabPanel, TabPanels, VStack, Text , HStack, Button} from "@chakra-ui/react"
import { useContext, useEffect, useRef } from "react";
import { FriendContext, MessageContext } from "./Friends";
import ChatBox from "./ChatBox";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
const Chat = ({ userid }) => {
  console.log("insideChat", userid);
  const { friendList, setFriendList } = useContext(FriendContext);
  const { messages } = useContext(MessageContext);
  const bottomDiv = useRef(null);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const [lenderButtonDisabled, setLenderButtonDisabled] = useState(new Map());
  const [borrowerButtonDisabled, setBorrowerButtonDisabled] = useState(new Map());
  console.log(messages);
   //handle click function to update the state of messages
  const handleButtonClickLender= async (message) => {
      
       try {
        console.log("uniqueId of message:", message);
        const response = await fetch('http://localhost:4000/api/messages/updateMessageStatusByLender', 
        {
          method: 'PUT' ,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: message.from,
            borrowerId: message.to,
            userType: 'lender',
            messageId: message.uniqueId
          })
          
        })

        const data= await response.json();
        setLenderButtonDisabled((prev)=> new Map(prev.set(message.uniqueId, true)));
        console.log(data.message);
       } catch(error){
        console.error('Error updating messages status', error);
       }
  }

  const handleButtonClickBorrower= async (message) => {
   
    try {
      console.log("uniqueId of message:", message);
     const response = await fetch('http://localhost:4000/api/messages/updateMessageStatusByBorrower', 
     {
       method: 'PUT' ,
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         userId: message.to,
         lenderId: message.from,
         userType: 'borrower',
         messageId: message.uniqueId
       })
       
     })

     const data= await response.json();
     setBorrowerButtonDisabled((prev)=> new Map(prev.set(message.uniqueId, true)));
     console.log(data.message);
    } catch(error){
     console.error('Error updating messages status', error);
    }
}
//initialisation of lenderButtonDisabled
 useEffect(()=>{
  const initialLenderDisabledMap= new Map();
  messages.forEach((message)=>{
        initialLenderDisabledMap.set(message.uniqueId, message.isLenderOk);
  });
  setLenderButtonDisabled(initialLenderDisabledMap);
  console.log(lenderButtonDisabled);
 },[messages]);

//initialisation of borrowerButtonDisabled
useEffect(()=>{
  const initialBorrowerDisabledMap= new Map();
  messages.forEach((message)=>{
    initialBorrowerDisabledMap.set(message.uniqueId, message.isBorrowerOk);
  });
  setBorrowerButtonDisabled(initialBorrowerDisabledMap);
}
, [messages]);
  useEffect(() => {
   
    bottomDiv.current?.scrollIntoView();
  });

 
  return friendList.length > 0 ? (
    <VStack height="100%" justifyContent="end">
      <TabPanels overflowY="scroll">
        {friendList.map((friend) => (
          <VStack
            key={`chat:${friend.username}`}
            flexDir="column-reverse"
            w="100%"
            as={TabPanel}
          >
            <div ref={bottomDiv} />

            {messages
              .filter(
                (msg) =>
                  msg.to === friend.userid || msg.from === friend.userid
              )
              .map((message, idx) => (
                <Text
                  key={`msg:${friend.username}.${idx}`}
                  fontSize="lg"
                  p="0.5rem 1rem"
                  maxW="50%"
                  borderRadius="lg"
                  mb="2"
                  ml="2"
                  mr="2"
                  color="white"
                  bg={message.to === friend.userid ? 'blue.500' : 'green.500'}
                  alignSelf={
                    message.to === friend.userid ? 'flex-end' : 'flex-start'
                  }
                >
                  {message.content}
                <HStack spacing="2" mt="1">
                    <Button key= {`moneyReceived:${message._id}`} variant="outline" size="sm" colorScheme="white" bg= {"blue.400"} onClick={() => handleButtonClickLender(message)} isDisabled= {message.uniqueId && lenderButtonDisabled.get(message.uniqueId)}>Money Received</Button>
                    <Button key={`moneySent:${message._id}`} variant="outline" size="sm" colorScheme="white" bg= {"blue.400"} onClick={()=> handleButtonClickBorrower(message)} isDisabled= {message.uniqueId && borrowerButtonDisabled.get(message.uniqueId)}>Money Sent</Button>
                </HStack>
                </Text>
               
              ))}
               
          </VStack>
        ))}
      </TabPanels>
      <ChatBox userid={userid} />
    </VStack>
  ) :
    (
      <VStack justify="center" pt="5rem" w="100%" textAlign="center" fontSize="large">
        <TabPanels>
          <div className="text-center">
            <p className={isDarkMode ? "text-xl  text-white inline-block animate-bounce" : "text-xl  text-gray-800 inline-block animate-bounce"}>
              No Friends :( Click to add Friends
            </p>
          </div>
          <div className="flex items-center justify-center h-full mt-24">
            <div className="w-48 h-48 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://cdn.dribbble.com/users/2058540/screenshots/8225138/media/af6d6d059328c6f2f9f6e7878c094c7e.gif"
                alt=""
              />
            </div>
          </div>
        </TabPanels>

      </VStack>

    );
}
export default Chat;