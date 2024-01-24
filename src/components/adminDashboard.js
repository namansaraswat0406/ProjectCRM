// FormComponent.js
import React, { useState } from 'react';

const FormComponent = () => {
  const [personData, setPersonData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    phone_number: '',
    image_url: '',
    project_id: '', // Assuming you get the project_id from somewhere
    user_id: '', // Assuming you get the user_id from somewhere
  });

  const [projectData, setProjectData] = useState({
    project_name: '',
    food_name: '',
    food_type: '',
    calories: '',
    image_url: '',
    user_id: '1', // Assuming you get the user_id from somewhere
  });

  const handlePersonSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/persons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(personData),
      });

      const data = await response.json();
      console.log('Person submitted:', data);
    } catch (error) {
      console.error('Error submitting person:', error);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();
      console.log('Project submitted:', data);
    } catch (error) {
      console.error('Error submitting project:', error);
    }
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <h2>Submit Person</h2>
      <form onSubmit={handlePersonSubmit}>
        {/* Person form fields */}
        {/* Example: */}
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

        {/* Add more input fields for other person details */}

        <button type="submit">Submit Person</button>
      </form>

      <h2>Submit Project</h2>
      <form onSubmit={handleProjectSubmit}>
        {/* Project form fields */}
        {/* Example: */}
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
        {/* Add more input fields for other project details */}

        <button type="submit">Submit Project</button>
      </form>
    </div>
  );
};

export default FormComponent;
