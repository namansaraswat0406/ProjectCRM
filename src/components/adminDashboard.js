import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ProjectForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    project_name: '',
    food_name: '',
    food_type: '',
    calories: '',
    image_url: '',
    user_id: '1', // Set a default role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the /api/users endpoint with the registration data
      const response = await fetch('http://localhost:3001/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Registration successful, navigate to login page
        navigate('/');
      } else {
        const data = await response.json();
        alert(`Registration failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <>
      <h2>Project Details</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="first_name">
          <Form.Label>Project Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Project name"
            name="project_name"
            value={formData.project_name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="last_name">
          <Form.Label>Food Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Food name"
            name="food_name"
            value={formData.food_name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Food Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Food Type"
            name="food_type"
            value={formData.food_type}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="phone_number">
          <Form.Label>Calories</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Calories"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            // placeholder="Enter your password"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            required
          />
        </Form.Group>
      

     

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </>
  );
};

export default ProjectForm;
