// SuperAdminPage.js

import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SuperAdminPage = () => {
    const [admins, setAdmins] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch users with role 'admin' from the server
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/users');
                const data = await response.json();
                const adminsData = data.filter(user => user.role === 'admin');
                setAdmins(adminsData);
            } catch (error) {
                console.error('Error fetching admins:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures that this effect runs once on mount

    const handleShowDetails = async (userId) => {
        try {
            // Fetch user details, projects, and persons by ID from the server
            const response = await fetch(`http://localhost:3001/api/user-details/${userId}`);
            const userDetails = await response.json();

            // Redirect to user dashboard with user details
            navigate(`/user-dashboard/${userId}`, { state: { userDetails } });
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    return (
        <div>
            <h1>Super Admin Page</h1>
            <h2>Admins</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map(admin => (
                        <tr key={admin.user_id}>
                            <td>{admin.user_id}</td>
                            <td>{admin.first_name}</td>
                            <td>{admin.last_name}</td>
                            <td>{admin.email}</td>
                            <td>
                                <Button onClick={() => handleShowDetails(admin.user_id)}>
                                    Show Details
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default SuperAdminPage;
