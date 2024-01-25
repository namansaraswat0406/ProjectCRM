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
        <div className=''>
            <h1>Dashboard</h1>
            <div>
                <div style={{ display: 'flex', justifyContent: "space-around" }}>
                    <h2>Person</h2>
                    <h2>Projects</h2>

                </div>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {data.persons.map((person) => (
                            <PersonComponent key={person.person_id} person={person} />
                        ))}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {data.projects.map((project) => (
                            <ProjectComponent key={project.project_id} project={project} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
