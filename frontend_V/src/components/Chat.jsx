import { TabPanel, TabPanels, VStack, Text } from "@chakra-ui/react"
import { useContext } from "react";
import { FriendContext } from "./Friends";

const Chat= ()=>{
    const {friendList, setFriendList}= useContext(FriendContext);
    return friendList.length >0 ? (
        <VStack>
            <TabPanels>
                
                <TabPanel>Friend One</TabPanel>
                <TabPanel>Friend Two</TabPanel>
            </TabPanels>
        </VStack>
    ):
    ( 
    <VStack justify= "center"  pt= "5rem" w="100%" textAlign="center" fontSize="large">
        <TabPanels>
            <Text>No Friends :( Click to add Friends</Text>
        </TabPanels>
    </VStack>
    );
}
export default Chat;