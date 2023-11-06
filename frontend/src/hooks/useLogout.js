import {useAuthContext} from './useAuthContext'
import {useWorkoutsContext} from './useWorkoutsContext'
export const useLogout= ()=>{
      const {dispatch}= useAuthContext();
      const {dispatch:workoutDispatch}= useWorkoutsContext(); //to use dispatch as other reference name
    const logout= ()=>{
        //remove user from local stroage
        localStorage.removeItem('user');
        
        //dispatch logout action
        dispatch({type: 'LOGOUT'}); //payload is not needed in logout as we set user null
        workoutDispatch({type: 'SET_WORKOUTS', payload: null});
    }
    return {logout};
}