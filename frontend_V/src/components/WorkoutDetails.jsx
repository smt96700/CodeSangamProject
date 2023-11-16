import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

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

  const utc = workout.recurringTime;
  const newutc = moment(utc).tz('Asia/Kolkata');
  const date= newutc.format("MMMM D, YYYY")


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

      <h1 className = "mb-5 flex text-xl font-medium text-indigo-700  underline">{workout.category}</h1>

      <p><strong className='font-semibold'>Description: </strong>{workout.description}</p>
      <p><strong className='font-semibold'>Payee: </strong>{workout.payee}</p>

      {workout.message !== null && (
        <p><strong className='font-semibold'>Message: </strong>{workout.message}</p>
       )}

      {workout.message === null && (
        <p><strong className='font-semibold'>Message: </strong> --</p>
       )}

<p><strong className='font-semibold'>Recurring: </strong>{workout.isRecurring}</p>
      
      {workout.isRecurring === 'Yes' && (
        <p><strong className='font-semibold'>Next Scheduled Pay: </strong>{date}</p>
      )}

      <hr className='mt-3 mb-3'></hr>


      <div className = "flex mt-3 mb-3">
        <h1 className = "mr-6 font-medium  text-indigo-600 text-lg">{workout.amount} /-</h1>
        <h1 className = " rounded-lg px-3 border-solid border-2 border-indigo-300 mr-6 bg-indigo-100"> {workout.method}</h1>
        <h1 className = " rounded-lg px-3 border-solid border-2 border-indigo-300 mr-6 bg-indigo-100">{workout.status}</h1>
      </div>

      <p>{dateTime}</p>
      <span><DeleteSweepIcon onClick={handleClick}></DeleteSweepIcon></span>
      
    </div> 
  )
}

export default WorkoutDetails