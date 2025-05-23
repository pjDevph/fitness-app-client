import WorkoutsList from '../components/Workouts/WorkoutsList';
import Container from 'react-bootstrap/Container';

const Workouts = () => {
  return (
    <Container className="py-4">
      <WorkoutsList />
    </Container>
  );
};

export default Workouts;