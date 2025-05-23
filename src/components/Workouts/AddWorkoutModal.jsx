import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addWorkout } from '../../services/workouts';

const AddWorkoutModal = ({ show, handleClose, onWorkoutAdded }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await addWorkout({ name, duration });
      onWorkoutAdded();
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add workout');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Workout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="workoutName">
            <Form.Label>Workout Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Morning Run, Weight Training"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="workoutDuration">
            <Form.Label>Duration (minutes)</Form.Label>
            <Form.Control
              type="number"
              placeholder="e.g., 30"
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
              {isLoading ? 'Adding...' : 'Add Workout'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddWorkoutModal;