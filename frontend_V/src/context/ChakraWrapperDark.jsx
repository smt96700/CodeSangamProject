// // ChakraWrapper.js
// import React from 'react';
// import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
// import {extendTheme} from "@chakra-ui/react"
// import { useTheme } from '@mui/material/styles';

// const ChakraWrapper = ({ children }) => {
//   const globalTheme = useTheme();
//     const isDarkMode = globalTheme.palette.mode === 'dark';

//     const theme = extendTheme({
//         config : {
//             initialColorMode : isDarkMode? 'dark' : 'light',
//             useSystemColorMode : true
//         },
//     });

//   return <ChakraProvider theme = {theme}>
//     <ColorModeScript initialColorMode = {theme.config.initialColorMode}/>
//     {children}
//   </ChakraProvider>;
// };

// export default ChakraWrapper;

// import React, { useState, useEffect } from 'react';
// import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
// import { extendTheme } from '@chakra-ui/react';
// import { useTheme } from '@mui/material/styles';


// const ChakraWrapper = ({ children }) => {
//   // State to manage the color mode
//   const [colorMode, setColorMode] = useState('light');
//   const globalTheme = useTheme();
//   // Use useEffect to update colorMode when the Material-UI theme changes
//   useEffect(() => {
//     const isDarkMode = globalTheme.palette.mode === 'dark';
//     setColorMode(isDarkMode ? 'dark' : 'light');
//   }, []);

//   // Create the Chakra UI theme
//   const theme = extendTheme({
//     config: {
//       initialColorMode: colorMode,
//       useSystemColorMode: false,
//     },
//     // Additional theme customization goes here
//   });

//   return (
//     <ChakraProvider theme={theme}>
//       <ColorModeScript initialColorMode={colorMode} />
//       {children}
//     </ChakraProvider>
//   );
// };

// export default ChakraWrapper;


// actual function
// ChakraWrapper.js
// import React, { useState, useEffect } from 'react';
// import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';



// const ChakraWrapper = ({ children }) => {
//   //  console.log("hello",theme.config.initialColorMode);
//   return (
//     <ChakraProvider>
//       <ColorModeScript />
//       {children}
//     </ChakraProvider>
//   );
// };

// export default ChakraWrapper;


import React from 'react';
import { ChakraProvider, ColorModeScript, extendTheme, useColorMode } from '@chakra-ui/react';

const ChakraWrapperDark = ({ children }) => {
  const { colorMode} = useColorMode();

  // Set up your custom theme with dark and light modes
  const theme = extendTheme({
    config: {
      initialColorMode: "light",
      useSystemColorMode: false,
    },
    styles: {
      global: {
        // Define global styles for both light and dark modes
        // You can customize these styles according to your needs
        body: {
          fontFamily: 'body',
          bg: colorMode === 'light' ? 'white' : 'gray.800',
          color: colorMode === 'light' ? 'black' : 'white',
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      {children}
    </ChakraProvider>
  );
};

export default ChakraWrapperDark;


