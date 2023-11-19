import {Grid, GridItem, Tabs} from '@chakra-ui/react'
import ChakraWrapper from '../context/ChakraWrapper'
import FriendsSidebar from './FriendsSidebar'
import Chat from './Chat'
import { createContext, useEffect, useState } from 'react'
import UseSocketSetup from '../hooks/useSocketSetup'
import { useAuthContext } from '../hooks/useAuthContext'
// import io from 'socket.io-client'

// const socket= io.connect("http://localhost:4000")
export const FriendContext= createContext();
const Friends= ()=>{
    const [friendList, setFriendList]= useState([]);
    const {user}= useAuthContext();
    const userid= user && user.userid;
    useEffect(()=>{
      const fetchFriends= async ()=>{
        const response = await fetch('http://localhost:4000/api/friends', {
         headers: {'userid': `${userid}`}
    })
     const json= await response.json();
       
       setFriendList(json);
      }
      if(user){
        fetchFriends();
      }
      
    }, [user]);
    UseSocketSetup();
    return (
       <FriendContext.Provider value= {{friendList, setFriendList}}>
       <ChakraWrapper>
         <Grid templateColumns="repeat(10, 1fr)" h="100vh" as={Tabs}>
        <GridItem colSpan="3" borderRight="2px solid gray">
          <FriendsSidebar />
        </GridItem>
        <GridItem colSpan="7">
            <Chat />
        </GridItem>
      </Grid>
        </ChakraWrapper>
        </FriendContext.Provider>
    )
}

export default Friends