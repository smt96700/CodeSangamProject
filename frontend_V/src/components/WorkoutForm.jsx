import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const {user}= useAuthContext();
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [payee, setPayee] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const [message, setMessage]= useState('');
  const [amount, setAmount]= useState(0);
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    //check if logged in
    if(!user){
      setError('You must be logged in');
      return;
    }
    
    const workout = {title, method, payee, message, amount};

    const response = await fetch('http://localhost:4000/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setMethod('')
      setPayee('')
      setMessage('')
      setError(null)
      setEmptyFields([])
      setAmount(0)
      console.log('new workout added', json)
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h1 id = "label" className = "flex flex-wrap justify-center text-3xl font-mono font-light underline">Add Expense</h1>
      <label>Expense Title:</label>
      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Payment Method:</label>
      <input 
        type="String"
        onChange={(e) => setMethod(e.target.value)}
        value={method}
        className={emptyFields.includes('method') ? 'error' : ''}
      /> 

      <label>Payee:</label>
      <input 
        type="String"
        onChange={(e) => setPayee(e.target.value)}
        value={payee}
        className={emptyFields.includes('payee') ? 'error' : ''}
      />
      <label>Message:</label>
      <input 
        type="text"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        className=''
      />
      <label>Amount:</label>
       <input 
        type="number"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
        className=''
      />
      <button>Add Expense</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm