import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faSignInAlt, faUserPlus, faSignOutAlt, faUser, faHome } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const AppNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <FontAwesomeIcon icon={faDumbbell} className="me-2" />
          Fitness Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user ? (
              <>
                <Nav.Link as={Link} to="/workouts">
                  <FontAwesomeIcon icon={faHome} className="me-1" />
                  Workouts
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  <FontAwesomeIcon icon={faUser} className="me-1" />
                  Profile
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="me-1" />
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  <FontAwesomeIcon icon={faSignInAlt} className="me-1" />
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <FontAwesomeIcon icon={faUserPlus} className="me-1" />
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;