import { useAuthContext } from "./useAuthContext"

export const useGoogle = () => {
    const { dispatch } = useAuthContext()

    const google = async () => {
        // const response = await fetch('http://localhost:4000/api/user/auth/google', {
        //     method: "GET", 
        //     mode: 'cors',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // })
        // const json = await response.json();

        // if (response.ok) {
        //     localStorage.setItem('user', JSON.stringify(json))
        //     dispatch ( {type : 'LOGIN', payload : json})
        // }
        // if(!response.ok) {
        //     console.log("lag gye")
        // }

        window.open('http://localhost:4000/api/user/auth/google', '_self')
    }   
    return {google}
}

