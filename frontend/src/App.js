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


function App() {
  const {user} = useAuthContext();
  const {isFilledUserProfile} = useProfileContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">

        <Routes>
          <Route 
            path = '/'
            element = {}
          />
        </Routes>




          {/* <Routes>
            <Route
              path = "/home"
              element = {!user ? <Navigate to = '/login'/> : <Home/>}
            />

            <Route 
              path="/"
              element={(user && isFilledUserProfile) ? <Home /> : (user ? <Navigate to = '/userProfile'/>  : <Navigate to='/login' />)}
            />
          <Route
            path= "/login"
            element={!user ? <Login /> : <Navigate to = '/home'/>}
           /> 
           <Route
            path= "/signup"
            element={!user ? <Signup /> : <Navigate to= '/userProfile' />}
           />
           <Route
            path= "/userProfile"
            //element={!isFilledUserProfile ? <UserProfile/> : <Navigate to= '/home' />}
            element = {(!user?  <Navigate to = '/login'/> : (!isFilledUserProfile ?  <UserProfile/> : <Navigate to = '/home'/>))}
           />

          </Routes> */}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
