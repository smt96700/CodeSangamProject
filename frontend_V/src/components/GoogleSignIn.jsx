// In your React component

import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleSignIn = () => {
  const responseGoogle = (response) => {
    console.log(response);
    // Handle the Google OAuth response
  };

  return (
    <div>
      <GoogleLogin
        clientId="275672644509-u0l2s4s44jb7mm5l6jp6hfqivricl5ud.apps.googleusercontent.com"
        buttonText="Sign in with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        redirectUri="http://localhost:4000/api/user/auth/google/redirect" // Redirect URI after successful login
      />
    </div>
  );
};

export default GoogleSignIn;
