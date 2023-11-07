import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
//user
import { useAuthContext } from './hooks/useAuthContext'
// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import UserProfileForm from './pages/UserProfileForm'

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
              element={(user && isFilledUserprofile) ? <Home /> : (user ? <UserProfileForm /> : <Navigate to='/login' />)}
            />
          <Route

            path= "/login"
            element={!user ? <Login /> : <Navigate to= '/' />}
           />
           <Route
            path= "/signup"
            element={!user ? <Signup /> : <Navigate to= '/' />}
           />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
