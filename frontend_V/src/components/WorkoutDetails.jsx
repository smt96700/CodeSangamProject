import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

// date fns
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'
import moment from 'moment-timezone';
const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
 const {user}= useAuthContext();
     
const utcTimestamp = workout.createdAt;
const newTimestamp = moment(utcTimestamp).tz('Asia/Kolkata');
const dateTime= newTimestamp.format("dddd, MMMM D, YYYY, h:mm:ss A z")
// Display the new timestamp in 'Asia/Kolkata' time zone

  const handleClick = async () => {

    if(!user){
       return ;
    }
    const response = await fetch('http://localhost:4000/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers:{'Authorization': `Bearer ${user.token}`}
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }
 
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      {workout.message !== null && (
        <p><strong>Message: </strong>{workout.message}</p>
       )}
       <p><strong>Amount: </strong>{workout.amount}</p>
      <p>{dateTime}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails