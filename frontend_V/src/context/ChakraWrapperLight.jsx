import React, { useState, useEffect } from 'react';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';



const ChakraWrapperLight = ({ children }) => {
  //  console.log("hello",theme.config.initialColorMode);
  return (
    <ChakraProvider>
      <ColorModeScript />
      {children}
    </ChakraProvider>
  );
};

export default ChakraWrapperLight;