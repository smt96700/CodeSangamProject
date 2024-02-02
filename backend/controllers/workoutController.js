const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
  const user_id= req.user._id;
  const workouts = await Workout.find({user_id}).sort({createdAt: -1})
  console.log(workouts)
  res.status(200).json(workouts)
}

const categoryWorkouts = async (req, res) => {
  
  const user_id = req.user._id;
  console.log(req.query.category);
  const workouts = await Workout.find({user_id, category : req.query.category}).sort({createdAt : -1})
  res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findById(id)

  if (!workout) {
    return res.status(404).json({error: 'No such workout'})
  }
  
  res.status(200).json(workout)
}

//date range function
const dateWorkouts = async (req, res) => {
  
  const user_id = req.user._id;
  const dateRange = req.body;

  console.log(user_id)

  //Assuming dateRange is an object with startDate and endDate
  const startDate = new Date(dateRange.startDate);
  const endDate = new Date(dateRange.endDate);
endDate.setDate(endDate.getDate() + 1);


  console.log(startDate + ' ' + endDate)

  try {
      // Find workouts created within the date range
      const workouts = await Workout.find({ user_id });
  console.log(workouts)
// Filter the workouts based on the date range
const filteredWorkouts = workouts.filter(workout => {
    const createdAtDate = new Date(workout.createdAt);
    return createdAtDate >= startDate && createdAtDate <= endDate;
});

      res.status(200).json(filteredWorkouts);
  } catch (error) {
      console.error("Error fetching workouts:", error);
      res.status(500).json({ error: "Internal server error" });
  }
}

// create new workout
const createWorkout = async (req, res) => {
  const {category, description, method, status, payee, message, amount, isRecurring, recurringTime} = req.body
  
  let emptyFields = []

  if(!category) {
    emptyFields.push('category')
  }
  if(!description) {
    emptyFields.push('description')
  }
  if(!method) {
    emptyFields.push('method')
  }
  if(!status) {
    emptyFields.push('status')
  }
  if(!payee) {
    emptyFields.push('payee')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id= req.user._id;
    const workout = await Workout.create({category, description, method, status, payee, message, amount, isRecurring, recurringTime, user_id})
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findOneAndDelete({_id: id})

  if (!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }
  const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}


module.exports = {
  getWorkouts,
  getWorkout,
  categoryWorkouts,
  createWorkout,
  deleteWorkout,
  updateWorkout,
  dateWorkouts
}