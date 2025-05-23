import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Fitness Tracker</h5>
            <p>Track your workouts and achieve your fitness goals</p>
          </Col>
{/*          <Col md={3}>
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </Col>*/}
          <Col md={3}>
            <h5>Contact</h5>
            <address>
              <strong>Email:</strong> info@fitnesstracker.com<br />
              <strong>Phone:</strong> (123) 456-7890
            </address>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">
            <p className="mb-0">&copy; {new Date().getFullYear()} Fitness Tracker. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;