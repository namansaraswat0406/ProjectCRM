// Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import PersonComponent from './PersonComponent';
import ProjectComponent from './ProjectComponent';
import { Row } from 'react-bootstrap';
import PersonComponent from './PersonComponent';

const Dashboard = () => {
    const [data, setData] = useState({ persons: [], projects: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/persons'); // Adjust the API endpoint
                setData((prevData) => ({ ...prevData, persons: response.data }));

                const projectResponse = await axios.get('http://localhost:3001/api/projects'); // Adjust the API endpoint
                setData((prevData) => ({ ...prevData, projects: projectResponse.data }));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>

            {/* <div style={{ display: "flex" }}> */}
            <h2>Person</h2>
            {/* <Row> */}
            {data.persons.map((person) => (
                <PersonComponent key={person.person_id} person={person} />
            ))}
            {/* </Row> */}
            <h2>Projects</h2>
            {/* <Row> */}
            {data.projects.map((project) => (
                <ProjectComponent key={project.project_id} project={project} />
            ))}
            {/* </Row> */}
        </div>
        // </div>
    );
};

export default Dashboard;
