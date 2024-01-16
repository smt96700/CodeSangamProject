import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lazy, useState, Suspense } from 'react';
import { useEffect } from 'react';
//user
import { useAuthContext } from './hooks/useAuthContext'
import { useProfileContext } from './hooks/useProfileContext'

import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

// pages & components
// import Home from './pages/Home'
// import Navbar from './components/Navbar'
// import Login from './pages/Login'
// import Signup from './pages/Signup'
// import UserProfile from './pages/UserProfile'
// import Profile from './pages/Profile'
// import Friends from './components/Friends'


const Home = lazy(() => import('./pages/Home'))
const Navbar = lazy(() => import('./components/Navbar'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const UserProfile = lazy(() => import('./pages/UserProfile'))
const Profile = lazy(() => import('./pages/Profile'))
const Friends = lazy(() => import('./components/Friends'))
const Wait = lazy(() => import('./pages/Wait'))

function App() {
  const { user } = useAuthContext();

  // const userLocal= localStorage.getItem('user');
  //  const parsedUserLocal=  userLocal ? JSON.parse(userLocal) : userLocal;

  // console.log("inside app userLocal", userLocal.isFilledUserProfile);
  const { isFilledUserProfile } = useProfileContext();
  console.log(user, "inside app");


  const [darkMode, setDarkMode] = useState(false)

  const lightTheme = createTheme({
    palette: {
      background: {
        default: '#f1f1f1',
      },
    },
  })

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#2E3030',
      },

    },
  });



  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading by setting isLoading to false after a delay
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Adjust the delay as needed

    return () => clearTimeout(timeoutId);
  });

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />

      <div className="App">
        <BrowserRouter>
          <Suspense fallback={

            <div className='flex flex-wrap justify-center items-center h-screen'>
              <div className="loader"></div>
            </div>

          }>
            {isLoading ? (
              <div className='flex flex-wrap justify-center items-center h-screen'>
                <div className="loader"></div>
              </div>

            ) : (
              <>
                <Navbar change={darkMode} setChange={() => setDarkMode(!darkMode)} />
                <div className="pages">
                  <Routes>
                    <Route
                      path = "/wait"
                      element = {<Wait/>}
                    />
                    <Route
                      path="/home"
                      element={!user ? <Navigate to='/login' /> : <Home />}
                    />

                    <Route
                      path="/"
                      element={(user && user.isFilledUserProfile) ? <Home /> : (user ? <Navigate to='/userProfile' /> : <Navigate to='/login' />)}
                    />

                    <Route
                      path="/login"
                      element={(!user ? <Login /> : (!user.isFilledUserProfile ? <Navigate to='/userProfile' /> : <Navigate to='/home' />))}
                    />

                    <Route
                      path="/signup"
                      element={!user ? <Signup /> : <Navigate to='/userProfile' />}
                    />

                    <Route
                      path="/userProfile"
                      element={<UserProfile />}
                    />
                    <Route path='/friends' element={(user) ? <Friends /> : <Navigate to='/home' />}
                    />
                    <Route
                      path="/profile"
                      element={(user) ? (user.isFilledUserProfile ? <Profile /> : <Navigate to='/userProfile' />) : <Navigate to='/login' />}
                    />

                  </Routes>
                </div>
              </>
            )}

          </Suspense>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
