import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to the server's authentication endpoint
            const response = await fetch('http://localhost:3001/api/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Authentication successful, redirect to the appropriate dashboard based on user role
                const userData = await response.json();
                const { role } = userData;
                
                if (role === 'superadmin') {
                    navigate('/dashboard/superadmin');
                } else if (role === 'admin') {
                    navigate('/dashboard/admin');
                }
                else if (role === 'user') {
                    navigate('/dashboard/user');
                }
                 else {
                    // Handle other roles or scenarios as needed
                    alert('Invalid user role');
                }
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Error during authentication:', error);
            alert('Authentication failed. Please try again.');
        }
    };

    const handleSignUp = () => {
        // Navigate to the signup page
        navigate('/signup');
    };

    return (
        <>
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
        </>
    );
}

export default Login;
