import { TabPanel, TabPanels, VStack, Text } from "@chakra-ui/react"
import { useContext, useEffect, useRef } from "react";
import { FriendContext, MessageContext } from "./Friends";
import ChatBox from "./ChatBox";
import { useTheme } from "@mui/material/styles";
const Chat= ({userid})=>{
    console.log("insideChat", userid);
    const {friendList, setFriendList}= useContext(FriendContext);
    const {messages}= useContext(MessageContext);
    const bottomDiv= useRef(null);
    const theme= useTheme();
    const isDarkMode= theme.palette.mode === 'dark'; 
    useEffect(()=>{
        bottomDiv.current?.scrollIntoView();
    })
    return friendList.length >0 ? (
        // <VStack h="100%" justify= "end">
        //     <TabPanels overflowY="scroll">
        //       {friendList.map(friend => (
        //          <VStack
        //          flexDir= "column-reverse"
        //          as= {TabPanel}
        //          key= {`chat: ${friend.username}`}
        //          w="100%"
        //          >
        //             <div ref= {bottomDiv}/>
        //             {messages.filter(
        //                 msg => msg.to === friend.userid || msg.from === friend.userid
        //             )
        //             .map((message, idx) => (
        //                 <Text 
        //                  m= {
        //                     message.to === friend.userid
        //                     ? "1rem 0 0 auto !important"
        //                     : "1rem auto 0 0 !important"
        //                  }
        //                 key = {`msg: ${friend.username}.${idx}`} fontSize="lg"
        //                   bg= {message.to === friend.userid ? "blue.200" : "green.200"}
        //                   color= "gray.800"
        //                   borderRadius= "gray.800"
        //                   p= "0.5rem 1rem"
        //                   maxW= "50%"
        //                 >
        //                     {message.content}
        //                 </Text>
        //             ))}
        //          </VStack>
        //       ))}   
            
        //     </TabPanels>
        //     <ChatBox userid= {userid}/>
        // </VStack>
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
                  </Text>
                ))}
            </VStack>
          ))}
        </TabPanels>
        <ChatBox userid={userid} />
      </VStack>
    ):
    ( 
    <VStack justify= "center"  pt= "5rem" w="100%" textAlign="center" fontSize="large">
        <TabPanels>
        <div className="text-center">
    <p className= {isDarkMode ? "text-xl  text-white inline-block animate-bounce": "text-xl  text-gray-800 inline-block animate-bounce"}>
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