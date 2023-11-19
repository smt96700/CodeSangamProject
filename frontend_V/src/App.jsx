import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
//user
import { useAuthContext } from './hooks/useAuthContext'
import { useProfileContext } from './hooks/useProfileContext'

// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import UserProfile from './pages/UserProfile'
import Friends from './components/Friends'

function App() {
  const {user} = useAuthContext();
  const {isFilledUserProfile} = useProfileContext();
  console.log(user, "inside app");
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path = "/home"
              element = {!user ? <Navigate to = '/login'/> : <Home/>}
            />

            <Route 
              path="/"
              element={(user && user.isFilledUserProfile) ? <Home /> : (user ? <Navigate to = '/userProfile'/>  : <Navigate to='/login' />)}
            />
          <Route
            path= "/login"
            element={(!user ? <Login /> : (!user.isFilledUserProfile ?  <Navigate to= '/userProfile' /> : <Navigate to = '/home'/>))}
           /> 
           <Route
            path= "/signup"
            element={!user ? <Signup /> : <Navigate to= '/userProfile' />}
           />
           <Route
            path= "/userProfile"
            //element={!isFilledUserProfile ? <UserProfile/> : <Navigate to= '/home' />}
            element = {<UserProfile/>}
           />
           <Route path= '/friends' element= {user ? <Friends /> : <Navigate to = '/home' />}
           />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
