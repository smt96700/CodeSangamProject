// ChakraWrapper.js
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

const ChakraWrapper = ({ children }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

export default ChakraWrapper;
