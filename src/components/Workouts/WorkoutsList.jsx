import { useState, useEffect } from 'react';
import { getWorkouts } from '../../services/workouts';
import WorkoutCard from './WorkoutCard';
import AddWorkoutModal from './AddWorkoutModal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

const WorkoutsList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const data = await getWorkouts();
      setWorkouts(data);
    } catch (err) {
      setError('Failed to fetch workouts. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleWorkoutAdded = () => {
    fetchWorkouts();
  };

  const handleWorkoutUpdated = () => {
    fetchWorkouts();
  };

  const handleWorkoutDeleted = (workoutId) => {
    setWorkouts(workouts.filter(workout => workout._id !== workoutId));
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="workouts-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Workouts</h2>
        <Button variant="primary" onClick={() => setShowAddModal(true)} id="addWorkout">
          Add Workout
        </Button>
      </div>

      {workouts.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">No workouts found. Add your first workout!</p>
        </div>
      ) : (
        <div className="workouts-list">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout._id}
              workout={workout}
              onWorkoutUpdated={handleWorkoutUpdated}
              onWorkoutDeleted={handleWorkoutDeleted}
            />
          ))}
        </div>
      )}

      <AddWorkoutModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        onWorkoutAdded={handleWorkoutAdded}
      />
    </div>
  );
};

export default WorkoutsList;