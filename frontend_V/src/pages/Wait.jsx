// import { useAuthContext } from "../hooks/useAuthContext"
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// export const Wait = () => {
//     const { dispatch } = useAuthContext()
//     const navigate = useNavigate()

//     useEffect (async () => {
//         const user = await fetch("http://localhost:4000/api/user/wait");
//         const json = await response.json();

//         if (response.ok) {
//             localStorage.setItem('user', JSON.stringify(json))
//             dispatchEvent( {type : 'LOGIN', payload : json})
//             navigate("/home")
//         }
//     }, [])


//     return (
//         <>
//         <h1>Wait a second</h1>
//         </>
//     );
// }

import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Wait() {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect( () => {
    const getGoogleUser = async () => {
        // try {
      
        //     const response = await fetch("http://localhost:4000/api/user/wait", {
        //         method: "GET",
        //         credentials: "include",
        //         headers: {
        //           Accept: "application/json",
        //           "Content-Type": "application/json",
        //           "Access-Control-Allow-Credentials": true,
        //         },
        //       });
        //     const json = await response.json();
      
        //     if (response.ok) {
        //       localStorage.setItem('user', JSON.stringify(json));
        //       dispatch({ type: 'LOGIN', payload: json });
        //       navigate("/home");
        //     } else {
        //       // Handle the case where the response is not okay (e.g., show an error message)
        //       console.error('Failed to fetch user data:', response.statusText);
        //     }
        //   } catch (error) {
        //     // Handle network errors or other exceptions
        //     console.error('Error during fetch:', error.message);
        //   }

        fetch("http://localhost:4000/api/user/wait", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
          throw new Error("authentication has been failed!");
        })
        .then((json) => {
            localStorage.setItem('user', JSON.stringify(json));
            dispatch({ type: 'LOGIN', payload: json });
            navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    

    getGoogleUser()
    
  }, []);

  return (
    <>
      <h1>Wait a second</h1>
    </>
  );
};

export default Wait
