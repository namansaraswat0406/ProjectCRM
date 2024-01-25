// UserDashboard.js

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const UserDashboard = () => {
    const location = useLocation();
    const { userDetails } = location.state || { userDetails: null };

    // State to store fetched project and person details
    const [projects, setProjects] = useState([]);
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        if (userDetails) {
            // Fetch projects and persons for the specific user from the server
            const fetchUserDetails = async () => {
                try {
                    const responseProjects = await fetch(`http://localhost:3001/api/projects/${userDetails.user.user_id}`);
                    const projectsData = await responseProjects.json();
                    setProjects(projectsData);

                    const responsePersons = await fetch(`http://localhost:3001/api/persons/${userDetails.user.user_id}`);
                    const personsData = await responsePersons.json();
                    setPersons(personsData);
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            };

            fetchUserDetails();
        }
    }, [userDetails]); // Run the effect when userDetails changes

    return (
        <div>
            <h1>User Dashboard</h1>

            {/* {userDetails && (
                <div>
                    <h2>User Details</h2>
                    <p>ID: {userDetails.user.user_id}</p>
                    <p>Name: {userDetails.user.first_name} {userDetails.user.last_name}</p>
                    <p>Email: {userDetails.user.email}</p>
                </div>
            )} */}

            {projects.length > 0 ? (
                <div>
                    <h2>Projects Assigned to User</h2>
                    <ul>
                        {projects.map(project => (
                            <li key={project.project_id}>
                                Project Name: {project.project_name}, Food Name: {project.food_name}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No projects assigned for this user.</p>
            )}

            {persons.length > 0 ? (
                <div>
                    <h2>Persons Assigned to User</h2>
                    <ul>
                        {persons.map(person => (
                            <li key={person.person_id}>
                                Person Name: {person.first_name} {person.last_name}, Address: {person.address}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No persons assigned for this user.</p>
            )}
        </div>
    );
};

export default UserDashboard;
