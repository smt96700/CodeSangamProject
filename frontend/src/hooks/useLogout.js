import {useAuthContext} from './useAuthContext'
export const useLogout= ()=>{
      const {dispatch}= useAuthContext();
    const logout= ()=>{
        //remove user from local stroage
        localStorage.removeItem('user');
        
        //dispatch logout action
        dispatch({type: 'LOGOUT'}); //payload is not needed in logout as we set user null
    }
    return {logout};
}