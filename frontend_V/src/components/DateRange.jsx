import React, { useState, useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";

import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext'

const DateRange = () => {
    const {workouts, dispatch} = useWorkoutsContext();
    const {user} = useAuthContext();

    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });

    useEffect(() => {
        const fetchDateWorkouts = async (value) => {
            try {
                const response = await fetch('http://localhost:4000/api/workouts/dateRange', {
                    method: 'POST', // Assuming you want to send the value object in the request body
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                        'Content-Type': 'application/json' // Specify the content type as JSON
                    },
                    body: JSON.stringify(value) // Convert the value object to JSON string and include it in the request body
                });
        
                const json = await response.json();

                console.log(json)
        
                if (response.ok) {
                    dispatch({ type: 'SET_WORKOUTS', payload: json });
                } else {
                    // Handle non-ok response
                    console.error('Error fetching workouts:', json);
                }
            } catch (error) {
                console.error('Error fetching workouts:', error);
            }
        };
        

          if(user && value.startDate && value.endDate) {
            fetchDateWorkouts(value)
          }
    }, [user, dispatch, value]);


    const handleValueChange = (newValue) => {
        
        setValue(newValue);
    }

    return (
        <div className="w-96 mx-4"> {/* Adjust the width and height as needed */}
            <Datepicker
                primaryColor="fuchsia"
                value={value}
                onChange={handleValueChange}
                showShortcuts={true}
            />
        </div>
    );
};

export default DateRange;
