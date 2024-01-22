import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

function SuperAdminDashboard() {
    const [projects, setProjects] = useState([]);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        // Fetch project data from the server
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/projects');
            if (response.ok) {
                const projectData = await response.json();
                setProjects(projectData);
            } else {
                console.error('Error fetching projects:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div>
                    <h1 className='mb-5'>Super Admin</h1>
                    <div>
                        <Card style={{ width: 'auto' }}>
                            <Card.Body>
                                <Card.Title>Dashboard</Card.Title>
                                <hr></hr>
                                <div style={{ display: "flex", gap: "60px", fontWeight: "bold" }} >
                                    <Card.Text>Project</Card.Text>
                                    <Card.Text>User</Card.Text>
                                    <Card.Text>Role</Card.Text>
                                </div>
                                <hr className='mt-0'></hr>

                                {projects.map((project) => (
                                    <div key={project.project_id} style={{ display: "flex", gap: "40px" }}>
                                        <Card.Text>{project.project_name}</Card.Text>
                                        <Card.Text>{project.user_name}</Card.Text>
                                        <Card.Text>{project.role}</Card.Text>
                                        <Card.Text>
                                            {/* Use Link to navigate to the details page */}
                                            <Link to={`/dashboard/admin/detail/${project.project_id}`}>
                                                <Button>
                                                    View Details
                                                </Button>
                                            </Link>
                                        </Card.Text>
                                    </div>
                                ))}
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SuperAdminDashboard;
