import { useState, useEffect, useContext } from 'react';
import { getUserDetails } from '../services/auth';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: ''
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const response = await getUserDetails();
        setUser(response.user);
        setFormData({
          firstName: response.user.firstName || '',
          lastName: response.user.lastName || '',
          email: response.user.email || '',
          mobileNo: response.user.mobileNo || ''
        });
      } catch (err) {
        setError('Failed to fetch user details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement update functionality here
    setEditMode(false);
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
    <div className="profile-container">
      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Card.Title>Profile Information</Card.Title>
            <Button
              variant={editMode ? 'secondary' : 'primary'}
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>

          {editMode ? (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formMobile">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          ) : (
            <div>
              <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              {formData.mobileNo && <p><strong>Mobile:</strong> {formData.mobileNo}</p>}
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;