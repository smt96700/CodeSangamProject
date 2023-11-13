import { Link } from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';
import { useProfileContext } from '../hooks/useProfileContext';
const Navbar = () => {
    const {logout}= useLogout();
    const {user}= useAuthContext();
    const {isFilledUserProfile}= useProfileContext();
    
    // console.log('Navbar chala')
    //handle click
    const handleClick=()=>{
        logout();
    }

  return (
    <header>
      <div className="container">
        <Link to="/home">
          <p>Expense Buddy</p>
        </Link>
        <nav>
          {user && ( 
           <div>
            <button onClick={handleClick}> {user.email} Log out</button>
          </div>
          )}

          {!user && ( 
          <div>
        <Link to="/login">{isFilledUserProfile} Login</Link>
        <Link to="/signup">{isFilledUserProfile} Signup</Link>
        </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar