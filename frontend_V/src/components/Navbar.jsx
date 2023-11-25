import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';
import { useProfileContext } from '../hooks/useProfileContext';
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Button from '@mui/material/Button';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import WorkoutForm from './WorkoutForm';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';

//navbar
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'

import avatarImage from '../assets/avatar.png';



const label = { inputProps: { 'aria-label': 'Color switch demo' } };


const Navbar = ({ change, setChange }) => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  // const socket= getSocketInstance();
  const { profileInfo, dispatch } = useProfileContext()
  const navigate = useNavigate()
  const userLocal = localStorage.getItem('user')

  //conditional styling for light, dark mode
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const handleClick = () => {
    logout();
  }

  // const fetchProfile = () => {
  //   const getProfile = async () => {
  //     console.log("fetched profile")

  //     const email = user.email
  //     console.log(email)
  //     const encodedEmail = encodeURIComponent(email);
  //     const response = await fetch(`http://localhost:4000/api/profile/getProfile?email=${encodedEmail}`)
  //     const json = await response.json()

  //     if (response.ok) {
  //       dispatch({ type: 'PROFILEADDED', payload: json })
  //       navigate('/profile')
  //     }
  //   }
  //   if (user) {
  //     getProfile()
  //   }
  // }

  // for the drawer
  const [state, setState] = React.useState({
    top: false,
  });

  //function to change state of drawer - open/close
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  //content inside drawer
  const list = (anchor) => (
    <Box
      sx={{ margin: "40px" }}
    >
      <WorkoutForm />
    </Box>
  )

  //state for light mode/ dark mode
  const [mode, setMode] = useState('Light Mode')
  useEffect(() => {
    if (change) {
      setMode('Dark Mode');
    }
    else {
      setMode('Light Mode')
    }
  }, [change]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (


    <Disclosure as="nav" className={`header ${isDarkMode ? 'dark:bg-zinc-700' : 'bg-white'}`}>

      <>
        <div className="mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">

            <div className="flex sm:items-stretch sm:justify-start">
              {/* for title */}
              <div className="flex flex-shrink-0 items-center">
                <span className={`icon mr-2 mt-1 ${isDarkMode ? 'text-white' : 'text-black'}`}><AccountBalanceIcon /></span>
                <Link to='/home'>
                  <h1 className={`title font-Agbalumo text-4xl ${isDarkMode ? 'dark:text-white' : 'text-black'}`}>Expense Buddy</h1>
                </Link>
              </div>

            </div>


            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

              {/* for buttons */}
              <div className=" mx-8 sm:ml-6 sm:block">

                {user && user.isFilledUserProfile && (
                  <div>

                    {['top'].map((anchor) => (
                      <React.Fragment key={anchor}>
                        <div className=''></div>
                        <Button variant="contained" onClick={toggleDrawer(anchor, true)}><AddIcon /><span className="hidden sm:inline">Add Expense</span></Button>
                        <Drawer
                          PaperProps={{
                            sx: { width: "60%", marginLeft: "20%", marginTop: '10px', borderRadius: "4px" },
                          }}
                          anchor={anchor}
                          open={state[anchor]}
                          onClose={toggleDrawer(anchor, false)}
                        >
                          {list(anchor)}
                        </Drawer>
                      </React.Fragment>
                    ))}

                  </div>
                )}
              </div>

              {/* for theme */}
              <button
                type="button"
                onClick={setChange} checked={change}
                className="relative rounded-full  p-1 "
              >
                {isDarkMode ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
                  : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                  </svg>
                }
              </button>



              {/* Profile dropdown */}
              {user && user.isFilledUserProfile && (
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm ">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-10 w-10 rounded-full"
                        src={avatarImage}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isDarkMode ? 'bg-zinc-800' : 'bg-white'}`}>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to='/profile'
                            className={classNames(active ? ((isDarkMode) ? 'bg-zinc-900 text-white' : 'bg-gray-100 text-black') : '', 'block px-4 py-2 text-sm')}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to='/friends'
                            className={classNames(active ? ((isDarkMode) ? 'bg-zinc-900 text-white' : 'bg-gray-100 text-black') : '', 'block px-4 py-2 text-sm')}
                          >
                            Friends
                          </Link>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            onClick={handleClick}
                            className={classNames(active ? ((isDarkMode) ? 'bg-zinc-900 text-white' : 'bg-gray-100 text-black') : '', 'block px-4 py-2 text-sm')}
                          >
                            Log out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              )}

              {user && !user.isFilledUserProfile && (
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm ">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={avatarImage}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isDarkMode ? 'bg-zinc-800' : 'bg-white'}`}>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            onClick={handleClick}
                            className={classNames(active ? ((isDarkMode) ? 'bg-zinc-900 text-white' : 'bg-gray-100 text-black') : '', 'block px-4 py-2 text-sm')}
                          >
                            Log out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              )}

              {!user && (

                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm ">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={avatarImage}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isDarkMode ? 'bg-zinc-800' : 'bg-white'}`}>                      <Menu.Item>
                      {({ active }) => (
                        <Link
                          to='/login'
                          className={classNames(active ? ((isDarkMode) ? 'bg-zinc-900 text-white' : 'bg-gray-100 text-black') : '', 'block px-4 py-2 text-sm')}
                        >
                          Log In
                        </Link>
                      )}
                    </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to='/signup'
                            className={classNames(active ? ((isDarkMode) ? 'bg-zinc-900 text-white' : 'bg-gray-100 text-black') : '', 'block px-4 py-2 text-sm')}
                          >
                            Sign Up
                          </Link>
                        )}
                      </Menu.Item>

                    </Menu.Items>
                  </Transition>
                </Menu>

              )}

            </div>
          </div>
        </div>
      </>

    </Disclosure>
  )
}


export default Navbar