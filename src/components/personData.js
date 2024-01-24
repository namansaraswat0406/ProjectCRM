import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

function ProjectPersonTable() {
    const [projects, setProjects] = useState([]);
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        // Fetch projects
        fetch('http://localhost:3001/api/projects')
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.error('Error fetching projects:', error));

        // Fetch persons
        fetch('http://localhost:3001/api/persons')
            .then(response => response.json())
            .then(data => setPersons(data))
            .catch(error => console.error('Error fetching persons:', error));
    }, []); // Empty dependency array ensures that this effect runs once after the initial render

    return (
        <div>
            <h2>Projects Table</h2>
            <Table striped bordered hover variant="dark">
                {/* Define your table headers */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Project Name</th>
                        <th>Food Name</th>
                        <th>Food Type</th>
                        <th>Calories</th>
                        <th>Image</th>
                        {/* Add more headers as needed */}
                    </tr>
                </thead>
                <tbody>
                    {/* Map through the projects and create rows dynamically */}
                    {projects.map((project, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{project.project_name}</td>
                            <td>{project.food_name}</td>
                            <td>{project.food_type}</td>
                            <td>{project.calories}</td>
                            <td>{project.image_url}</td>

                            {/* Add more columns as needed */}
                        </tr>
                    ))}
                </tbody>
            </Table>

            <h2>Persons Table</h2>
            <Table striped bordered hover variant="dark">
                {/* Define your table headers */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Map through the persons and create rows dynamically */}
                    {persons.map((person, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{person.first_name}</td>
                            <td>{person.last_name}</td>
                            <td>{person.address}</td>
                            <td>{person.phone_number}</td>
                            <td>{person.image_url}</td>

                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ProjectPersonTable;
