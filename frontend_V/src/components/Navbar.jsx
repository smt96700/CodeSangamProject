import { Link } from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';
import { useProfileContext } from '../hooks/useProfileContext';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const Navbar = () => {
    const {logout}= useLogout();
    const {user}= useAuthContext();
    const {isFilledUserProfile}= useProfileContext();
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
           <div>
            <Button onClick={fetchProfile} variant="contained" endIcon={<SendIcon />}> profile</Button>
          </div>
          )}

          {user &&( 
           <div>
            <Button onClick={handleClick} variant="contained" endIcon={<SendIcon />}>Log Out</Button>
          </div>
          )}

          {!user && ( 
          <div>
        <Link to="/login" className = "mx-3 px-4 py-2 text-blue-100 no-underline bg-blue-600 rounded hover:bg-blue-700  hover:text-blue-200" >{isFilledUserProfile} Login</Link>
        <Link to="/signup" className = "px-4 py-2 text-blue-100 no-underline bg-blue-600 rounded hover:bg-blue-700  hover:text-blue-200">{isFilledUserProfile} Signup</Link>
        </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar