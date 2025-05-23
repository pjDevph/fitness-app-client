import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="home-page">
      <div className="hero-section py-5 text-center text-white">
        <Container>
          <h1 className="display-4 mb-4">Track Your Fitness Journey</h1>
          <p className="lead mb-4">
            Achieve your fitness goals with our comprehensive workout tracker
          </p>
          {!user && (
            <Link to="/register">
              <Button variant="primary" size="lg" className="me-2">
                Get Started
              </Button>
            </Link>
          )}
          {user && (
            <Link to="/workouts">
              <Button variant="primary" size="lg" className="me-2">
                View Workouts
              </Button>
            </Link>
          )}
        </Container>
      </div>

      <Container className="py-5">
        <h2 className="text-center mb-5">Why Choose Our Fitness Tracker?</h2>
        <Row>
          <Col md={4} className="mb-4">
            <div className="feature-card p-4 text-center">
              <h3>Track Progress</h3>
              <p>Monitor your workouts and see your improvement over time.</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="feature-card p-4 text-center">
              <h3>Set Goals</h3>
              <p>Define your fitness objectives and work towards them.</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="feature-card p-4 text-center">
              <h3>Stay Motivated</h3>
              <p>Get insights and stay on track with your fitness routine.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;