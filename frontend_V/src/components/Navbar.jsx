import { Link } from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';
import { useProfileContext } from '../hooks/useProfileContext';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import socket from '.././socket'
const Navbar = () => {
    const {logout}= useLogout();
    const {user}= useAuthContext();
    const {isFilledUserProfile}= useProfileContext();
    
    const handleClick=()=>{
        logout(socket);
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
          {user && ( 
           <div>
            <Button onClick={handleClick} variant="contained" endIcon={<SendIcon />}> Log out</Button>
          </div>
          )}

          {!user && ( 
          <div>
        <Link to="/login" className = "mx-3 px-4 py-2 text-blue-100 no-underline bg-blue-600 rounded hover:bg-blue-700  hover:text-blue-200" >{isFilledUserProfile} Login</Link>
        <Link to="/signup" className = "px-4 py-2 text-blue-100 no-underline bg-blue-600 rounded hover:bg-blue-700  hover:text-blue-200">{isFilledUserProfile} Signup</Link>
        </div>
          )}
          
         {user && (<div>
          <Link to="/friends" className = "mx-3 px-4 py-2 text-blue-100 no-underline bg-blue-600 rounded hover:bg-blue-700  hover:text-blue-200" >Friends</Link>
          </div>)}
        </nav>
      </div>
    </header>
  )
}

export default Navbar