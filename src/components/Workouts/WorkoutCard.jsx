import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { deleteWorkout, completeWorkout } from '../../services/workouts';
import EditWorkoutModal from './EditWorkoutModal';

const WorkoutCard = ({ workout, onWorkoutUpdated, onWorkoutDeleted }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteWorkout(workout._id);
      onWorkoutDeleted(workout._id);
    } catch (error) {
      console.error('Error deleting workout:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleComplete = async (status) => {
    setIsCompleting(true);
    try {
      await completeWorkout(workout._id, status);
      onWorkoutUpdated();
    } catch (error) {
      console.error('Error updating workout status:', error);
    } finally {
      setIsCompleting(false);
    }
  };

  const dateAdded = new Date(workout.dateAdded).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <Card className="mb-3 workout-card">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <Card.Title className="mb-1">{workout.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Duration: {workout.duration} minutes
              </Card.Subtitle>
            </div>
            <Badge
              bg={workout.status === 'completed' ? 'success' : 'warning'}
              className="text-capitalize"
            >
              {workout.status}
            </Badge>
          </div>
          <Card.Text className="text-muted small mb-3">Added: {dateAdded}</Card.Text>
          
          <div className="d-flex justify-content-between">
            <div>
              {workout.status === 'pending' ? (
                <Button
                  variant="success"
                  size="sm"
                  className="me-2"
                  onClick={() => handleComplete('completed')}
                  disabled={isCompleting}
                >
                  <FontAwesomeIcon icon={faCheck} className="me-1" />
                  {isCompleting ? 'Marking...' : 'Complete'}
                </Button>
              ) : (
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleComplete('pending')}
                  disabled={isCompleting}
                >
                  <FontAwesomeIcon icon={faTimes} className="me-1" />
                  {isCompleting ? 'Marking...' : 'Set Pending'}
                </Button>
              )}
            </div>
            <div>
              <Button
                variant="outline-primary"
                size="sm"
                className="me-2"
                onClick={() => setShowEditModal(true)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      <EditWorkoutModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        workout={workout}
        onWorkoutUpdated={onWorkoutUpdated}
      />
    </>
  );
};

export default WorkoutCard;