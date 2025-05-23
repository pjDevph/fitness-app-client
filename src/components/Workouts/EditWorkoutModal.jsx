import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { updateWorkout } from '../../services/workouts';

const EditWorkoutModal = ({ show, handleClose, workout, onWorkoutUpdated }) => {
  const [name, setName] = useState(workout.name);
  const [duration, setDuration] = useState(workout.duration);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await updateWorkout(workout._id, { name, duration });
      onWorkoutUpdated();
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update workout');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Workout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="editWorkoutName">
            <Form.Label>Workout Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="editWorkoutDuration">
            <Form.Label>Duration (minutes)</Form.Label>
            <Form.Control
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Workout'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditWorkoutModal;