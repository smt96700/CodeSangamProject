import { Button, HStack, Input, VStack } from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useContext } from "react";
import * as Yup from "yup";
import { MessageContext } from "./Friends";
import getSocketInstance from "../socket";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
const MotionButton = motion(Button);
const ChatBox = ({ userid }) => {
  const { setMessages } = useContext(MessageContext);
  const socket = getSocketInstance();
  const theme= useTheme();
  const isDarkMode= theme.palette.mode === 'dark';
  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        yoyo: Infinity,
      },
    },
  };
  return (
    <Formik
      initialValues={{ message: "" }}
      // validationSchema={Yup.object({
      //   message: Yup.string().required("Message is required").min(1, "Message must be at least 1 character").max(255, "Message must be at most 255 characters"),
      // })}
      validationSchema={Yup.object({
        message: Yup.number()  // Ensures the input is a number
            .required("Amount is required")
            .min(1, "Amount must be a positive number or 0")  // Adjust the minimum value as needed
            .max(1000, "Amount must be at most 1000")  // Adjust the maximum value as needed
    })}
      onSubmit={(values, actions) => {
        const message = { to: userid, from: null, content: values.message };
        socket.emit("dm", message);
        setMessages((prevMsgs) => [message, ...prevMsgs]);
        console.log(JSON.stringify(message));
        actions.resetForm();
      }}
    >
      <VStack width="100%">
      <ErrorMessage name="message" component="div" className="text-xl text-red-600 mt-2 font-semibold "/>
      <HStack as={Form} w="100%"  pb= "1.4rem" px= "1.4rem">
     
            <Input 
            as= {Field}
            name= "message"
            placeholder="Type Amount here.."
            size= "lg"
            autoComplete="off"
            mt="20px"
            _placeholder={{color: isDarkMode ? "white": "black"}}
            color= {isDarkMode ? "white" : "black"}
            />
            <MotionButton
      whileHover="hover"
      variants={buttonVariants}
      size="lg"
      colorScheme="teal"
      type="submit"
      ml= "1.2rem"
    >
      Submit
    </MotionButton>
        </HStack>
    </VStack>
    </Formik>
  );
};
export default ChatBox;
