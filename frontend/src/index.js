import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutsContextProvider } from './context/WorkoutContext'
import { AuthContextProvider } from './context/AuthContext'
import { ProfileContextProvider } from './context/ProfileContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <ProfileContextProvider>
    <WorkoutsContextProvider>
      <App />
    </WorkoutsContextProvider>
    </ProfileContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);