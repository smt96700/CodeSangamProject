import { useEffect } from "react";
import getSocketInstance from ".././socket";
// import { io } from "socket.io-client";
import { useLogout } from "./useLogout";
// import { useAuthContext } from "./useAuthContext";
const UseSocketSetup = () => {
  // const {user}= useAuthContext();
  // const username= "smt96700"
  // const token= "Hello8938";
  // const socket= new io("http://localhost:4000", {
  //     autoConnect: false,
  //     withCredentials: true,
  //     query: {
  //         username,
  //         token,
  //     },
  // });
  const { logout } = useLogout();
  const socket= getSocketInstance();
  useEffect(() => {
    // const user= JSON.parse(localStorage.getItem('user'));
    // const userid = user.userid;
    // const socket = new io("http://localhost:4000", {
    //   autoConnect: false,
    //   withCredentials: true,
    //   query: {
    //     userid,
    //   },
    // });
    
    socket.connect();
    socket.on("connect_error", () => {
      logout();
    });
    return () => {
      socket.off("connect_error");
    };
  }, []);
};
export default UseSocketSetup;
