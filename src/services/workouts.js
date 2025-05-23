import api from './api';

export const getWorkouts = async () => {
  try {
    const response = await api.get('/workouts/getMyWorkouts');
    return response.data.workouts;
  } catch (error) {
    throw error;
  }
};

export const addWorkout = async (workoutData) => {
  try {
    const response = await api.post('/workouts/addWorkout', workoutData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateWorkout = async (workoutId, workoutData) => {
  try {
    const response = await api.put('/workouts/updateWorkout', {
      _id: workoutId,
      ...workoutData
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteWorkout = async (workoutId) => {
  try {
    const response = await api.delete('/workouts/deleteWorkout', {
      data: { _id: workoutId }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const completeWorkout = async (workoutId, status) => {
  try {
    const response = await api.patch('/workouts/completeWorkoutStatus', {
      workoutId,
      status
    });
    return response.data.workout;
  } catch (error) {
    throw error;
  }
};