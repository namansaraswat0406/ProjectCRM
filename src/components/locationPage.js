import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleLoginSuccess = async (userData) => {
        const { role } = userData;

        if (role === 'superadmin') {
            navigate('/dashboard/superadmin');
        } else if (role === 'admin') {
            navigate('/dashboard/admin');
        } else if (role === 'user') {
            // Show the location modal for users
            setShowModal(true);
        } else {
            alert('Invalid user role');
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/dashboard/user');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const userData = await response.json();
                handleLoginSuccess(userData);
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Error during authentication:', error);
            alert('Authentication failed. Please try again.');
        }
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    const handleGetLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    alert(`Your location: ${latitude}, ${longitude}`);
                    handleCloseModal(); // Close the modal after getting the location
                },
                (error) => {
                    console.error('Error getting location:', error);
                    alert('Error getting your location. Please try again.');
                }
            );
        } else {
            alert('Geolocation is not supported in your browser.');
        }
    };

    return (
        <div className='container'>
            <h1 className='container'>Login</h1>
            <Form className='container my-5' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Button variant="primary" className='mx-5' onClick={handleSignUp}>
                    Sign up
                </Button>
            </Form>

            {/* Location Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Get Your Location</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Click the button below to get your current location:</p>
                    <Button variant="primary" onClick={handleGetLocation}>
                        Get Location
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    {/* No need for a continue button, as it will be triggered after getting the location */}
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Login;
