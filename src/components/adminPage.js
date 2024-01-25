// src/components/AdminPage.js

import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch users with role 'user' from the server
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/users');
                const data = await response.json();
                const usersWithUserRole = data.filter(user => user.role === 'user');
                setUsers(usersWithUserRole);
            } catch (error) {
                console.error('Error fetching users:', error);
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
            <h1>Admin Dashboard</h1>
            <h2>Users</h2>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.user_id}>
                            <td>{user.user_id}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.role}</td>
                            <td>{user.email}</td>
                            <td>
                                <Button onClick={() => handleShowDetails(user.user_id)}>
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

export default AdminPage;
