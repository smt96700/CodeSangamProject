import { Link } from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';
import { useProfileContext } from '../hooks/useProfileContext';
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Button from '@mui/material/Button';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Person2Icon from '@mui/icons-material/Person2';
import WorkoutForm from './WorkoutForm';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

const Navbar = () => {
    const {logout}= useLogout();
    const {user}= useAuthContext();
    const {profileInfo, dispatch} = useProfileContext()
    const navigate = useNavigate()
    
    const handleClick=()=>{
        logout();
    }

    const fetchProfile = () => {
      const getProfile = async () => {
        console.log("fetched profile")

        const email = user.email
        console.log(email)
        const encodedEmail = encodeURIComponent(email);
        const response = await fetch(`http://localhost:4000/api/profile/getProfile?email=${encodedEmail}`)
        const json = await response.json()

        if (response.ok) {
          dispatch({type: 'PROFILEADDED', payload: json})
          navigate('/profile')
        }
      } 
      if (user) {
        getProfile()
      }
    }
    
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
        sx = {{margin : "20px"}}
      >
        <WorkoutForm/>
      </Box>
    )

  return (
    <header>
      <div className="container">

        <Link to="/home">
          <div className = "flex">
            <span className="material-symbols-outlined text-4xl m-3">account_balance</span>
            <h1>Expense Buddy</h1>
          </div>
        </Link>
        <nav>
          {user && user.isFilledUserProfile &&( 
              <div className='flex'>
                <div className='mx-4'>
                  {['top'].map((anchor) => (
                    <React.Fragment key={anchor}>
                      <Button variant="contained" onClick={toggleDrawer(anchor, true)}>Add Expense</Button>
                      <Drawer
                        PaperProps={{
                          sx: { width: "60%", marginLeft : "20%", marginTop : '10px', borderRadius : "4px"},
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

                <div className='mx-1'>
                  <Button onClick={fetchProfile} variant="contained" endIcon={<Person2Icon />}> profile </Button>
                </div>
              </div>
          )}

          {user &&( 
           <div>
            <Button onClick={handleClick} variant="contained" endIcon={<ArrowOutwardIcon />}>Log Out</Button>
          </div>
          )}

          {!user && ( 
          <div>
        <Link to="/login" className = "mx-3 px-4 py-2 text-blue-100 no-underline bg-blue-600 rounded hover:bg-blue-700  hover:text-blue-200" > Login</Link>
        <Link to="/signup" className = "px-4 py-2 text-blue-100 no-underline bg-blue-600 rounded hover:bg-blue-700  hover:text-blue-200"> Signup</Link>
        </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar