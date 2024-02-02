import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useEffect, useState }from 'react'

// components
import WorkoutDetails from '../components/WorkoutDetails'
import ChartOnCategory from '../charts/pieChart/ChartOnCategory'

//authContext
import { useAuthContext } from '../hooks/useAuthContext'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import CurrencyConverter from '../components/CurrencyConverter'

//datepicker
import DateRange from '../components/DateRange';

const Home = () => {
  // states for the notification bar
  const [open, setOpen] = React.useState(false);
  const [all, setAll] = useState(true);
  const [categories, setCategories] = useState(false);
  const [date, setDate] = useState(false);

  const [selectCategory, setSelectCategory] = useState('');
  const categoryArray = ["Meals/ Entertainment", "Travel", "Electricity Bill", "Water Bill", "LPG Gas", "Internet and Phone Bills", "Electronic Equipments", "Training/ Education", "Grocery", "Clothing"];

  const [anchorEl, setAnchorEl] = useState(null);
  const openBox = Boolean(anchorEl)
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    console.log("handle click chala")
    
  };
  const handleCloseBox = () => {
    setAnchorEl(null)
    setValues();
    setCategories(true)
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setUserResponded(true)
    setOpen(false);
  };

  const setValues = () => {
      setAll(false);
      setCategories(false);
      setDate(false);
  }

  const {workouts, dispatch} = useWorkoutsContext()
  const {user}= useAuthContext();
  const [userResponded, setUserResponded] = useState(false)

  useEffect(() => {
    console.log("chal rha h")
    const fetchAllWorkouts = async () => {
      console.log("inside all");
      const response = await fetch('http://localhost:4000/api/workouts', {headers:{'Authorization': `Bearer ${user.token}`}})
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }

    const fetchCategoryWorkouts = async (category) => {
      console.log("inside categories");
      console.log(category);
      const encodedCategory = encodeURIComponent(category);
      
      const response = await fetch(`http://localhost:4000/api/workouts/category?category=${encodedCategory}`, {headers:{'Authorization': `Bearer ${user.token}`}})
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }



     if(user && all){
      fetchAllWorkouts()
     }

     if (user && categories) {
      console.log("function ke andar h")
     
     
      fetchCategoryWorkouts(selectCategory);
     }

     
  }, [user, dispatch, all, categories, selectCategory, date])

  useEffect(() => {
    const callNotification = () => {
      let intervalCounter = 0;
      if (giveNotification()) {
        const intervalId = setInterval(() => {
          const currentDate = new Date();
          const dueDate = new Intl.DateTimeFormat('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric', 
            
          }).format(currentDate);
          
          notifyUser(`Pay the Bill dated ${dueDate}`) 
          // Increment the counter
          intervalCounter++;

          // Check if the counter has reached the limit
          if (intervalCounter >= 0) {
            clearInterval(intervalId);
          }
        }, 5000)
        return () => clearInterval(intervalId);
      }

    }

    if (workouts) {
      console.log("fsjfs")
      callNotification()
    }
  }, [workouts])

  const giveNotification = () => {
    const checkDue = () => {
      console.log(workouts);
  
      // Use Array.some to check if any workout matches the condition
      return workouts.some((workout) => {
        const recurringTime = new Date(workout.recurringTime);
        const presentDate = new Date();
  
        // Check if the recurringTime matches the present date
        if (
          recurringTime.getDate() === presentDate.getDate() &&
          recurringTime.getMonth() === presentDate.getMonth() &&
          recurringTime.getFullYear() === presentDate.getFullYear()
        ) {
          // Send a notification
          console.log("Notification sent");
          return true;
        }
  
        return false;
      });
    };
  
    if (Notification.permission === 'granted') {
      console.log(checkDue())
      return checkDue();
    }
    return false;
  };
  

  async function notifyUser(notificationText = "Thank you for enabling notification") {
    if (!('Notification' in window)) {
      alert("Notifications are not supported in this browser") 
    }
    else if (Notification.permission === 'granted') {
      const notification = new Notification(notificationText) 
    }
    else if (Notification.permission !== 'denied') {
      await Notification.requestPermission().then ((permission) => {
        if (permission === 'granted') {
          const notification = new Notification(notificationText)
        }
      })
    }
  }

  async function enableNotificationAndClose () {
    await notifyUser().then( () => {
      setUserResponded(true)
      setOpen(false);
    })
  }

  function disableNotificationAndClose () {
    setUserResponded(true)
    setOpen(false);
  }

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

  return (
    <>
    <div className = "flex flex-wrap justify-end">
    {(!(userResponded) && !(Notification.permission === 'granted')) ? (
        <>
        <Button variant="outlined" onClick={handleClickOpen}>
          Allow Notification
        </Button>
        <Dialog
          open= {open}
          TransitionComponent={Transition}
          aria-describedby="alert-dialog-slide-description"
        >
        
          <DialogTitle>{"Notifications?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Allow Notifications to get reminders of the 
              due Expenses.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={enableNotificationAndClose}>Sure</Button>
            <Button onClick={disableNotificationAndClose}>No Thanks</Button>
          </DialogActions>
        </Dialog>
      </>


  ) : (Notification.permission === 'granted' && workouts) ? (
      <>
      </>
    
  ) : (
    <>
    </>
  )}

    </div>

    <div className='flex flex-wrap'>
    <Button
    onClick={ () => {
      setValues()
      setAll(true)
    }}
    >All</Button>


      <Button
        id="demo-positioned-button"
        aria-controls={openBox ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openBox ? 'true' : undefined}
        
        onClick={handleClick}
      >
        Select_Category
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={openBox}
        onClose={handleCloseBox}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >

        {categoryArray.map((category) => (
          <MenuItem key={category} onClick={ () => {
            setSelectCategory(category)
            handleCloseBox()
          }}>
            {category}
          </MenuItem>
        ))}

      </Menu>
      
      <Button
        onClick={() => {
          setValues();
          setDate(true);
        }}
      >
      <DateRange />
      </Button>
      

      </div>
    
    

    
    
    <div className="home">
      <div className="workouts ">
        
        {all && workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
        {categories && workouts && workouts.map((workout) => (
          workout.category === selectCategory && (
            <WorkoutDetails key={workout._id} workout={workout} />
          )
        ))}
        {date && workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <div className = ''>
      {workouts && 
        <ChartOnCategory workouts = {workouts}/>
      }
      {workouts && 
        <CurrencyConverter/>
      }
      </div>
    </div>
     
    </>
  )
}

export default Home