import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dashboard from './dashboard';

const FormComponent = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');

  useEffect(() => {
    // Fetch users when the component mounts
    fetch('http://localhost:3001/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const [personData, setPersonData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    phone_number: '',
    image_url: '',
  });

  const [projectData, setProjectData] = useState({
    project_name: '',
    food_name: '',
    food_type: '',
    calories: '',
    image_url: '',
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ensure a user is selected
      if (!selectedUserId) {
        console.error('Please select a user.');
        return;
      }

      // Submit project data
      const projectResponse = await fetch('http://localhost:3001/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...projectData, user_id: selectedUserId }),
      });

      const projectResult = await projectResponse.json();
      console.log('Project submitted:', projectResult);

      // Set the project_id in personData
      setPersonData(prevPersonData => ({
        ...prevPersonData,
        project_id: projectResult.project_id,
      }));


      // Submit person data
      const personResponse = await fetch('http://localhost:3001/api/persons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...personData, user_id: selectedUserId, project_id: projectResult.project_id }),
      });

      const personResult = await personResponse.json();
      console.log('Person submitted:', personResult);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    // <div className='container'>
    <>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>

        <div>
          <Dashboard></Dashboard>
        </div>
        <div>
          <Button variant="primary" onClick={handleShow}>
            Create New Form
          </Button>
        </div>
      </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>  <h2>Submit Project</h2>
          <Form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: '30px' }}>
            {/* Person form fields */}
            <input
              type="text"
              placeholder="First Name"
              value={personData.first_name}
              onChange={(e) => setPersonData({ ...personData, first_name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={personData.last_name}
              onChange={(e) => setPersonData({ ...personData, last_name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Address"
              value={personData.address}
              onChange={(e) => setPersonData({ ...personData, address: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={personData.phone_number}
              onChange={(e) => setPersonData({ ...personData, phone_number: e.target.value })}
            />
            <input
              type="file"
              placeholder="Image"
              value={personData.image_url}
              onChange={(e) => setPersonData({ ...personData, image_url: e.target.value })}
            />

            {/* Project form fields */}
            <input
              type="text"
              placeholder="Project Name"
              value={projectData.project_name}
              onChange={(e) => setProjectData({ ...projectData, project_name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Food Name"
              value={projectData.food_name}
              onChange={(e) => setProjectData({ ...projectData, food_name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Food Type"
              value={projectData.food_type}
              onChange={(e) => setProjectData({ ...projectData, food_type: e.target.value })}
            />
            <input
              type="text"
              placeholder="Calories"
              value={projectData.calories}
              onChange={(e) => setProjectData({ ...projectData, calories: e.target.value })}
            />
            <input
              type="file"
              placeholder="Image"
              value={projectData.image_url}
              onChange={(e) => setProjectData({ ...projectData, image_url: e.target.value })}
            />

            {/* User selector */}
            <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
              <option value="">Select User</option>
              {users.map(user => (
                <option key={user.user_id} value={user.user_id}>
                  {user.first_name} {user.last_name}
                </option>
              ))}
            </select>

            <button type="submit" onClick={handleClose}>Submit Person and Project</button>
          </Form></Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
      {/* </div> */}
    </>
  );
};

export default FormComponent;
