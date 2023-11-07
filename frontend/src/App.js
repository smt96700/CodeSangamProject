import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
//user
import { useAuthContext } from './hooks/useAuthContext'
// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import UserProfile from './pages/UserProfile'
import UserProfile from './pages/UserProfile'

function App() {
  const {user, isFilledUserprofile} = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={(user && isFilledUserprofile) ? <Home /> : (user ? <Navigate to = '/userProfile'/>  : <Navigate to='/login' />)}
            />
          <Route
            path= "/login"
            element={!user ? <Login /> : <Navigate to= '/' />}
           />
           <Route
            path= "/signup"
            element={!user ? <Signup /> : <Navigate to= '/' />}
           />
           <Route
            path= "/userProfile"
            // element={!isFilledUserprofile ? <UserProfile/> : <Navigate to= '/' />}
            element = {<UserProfile/>}
           />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
