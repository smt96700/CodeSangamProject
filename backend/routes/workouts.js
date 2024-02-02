const express = require('express')
const {
  createWorkout,
  getWorkouts,
  categoryWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
  dateWorkouts,
} = require('../controllers/workoutController')

const requireAuth= require('../middleware/requireAuth');

const router = express.Router()

//check for authenticated user (adding _id property to req)
router.use(requireAuth);

// GET all workouts
router.get('/', getWorkouts)

// get category wise workout
router.get('/category', categoryWorkouts);

//GET a single workout
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)

// get workout in a date range
router.post('/dateRange', dateWorkouts);


module.exports = router