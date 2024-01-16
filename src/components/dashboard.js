import { useState } from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

function SuperAdminDashboard() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (<>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
                <h1 className='mb-5'>Super Admin</h1>
                <div>
                    <Card style={{ width: 'auto' }}>
                        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                        <Card.Body>
                            <Card.Title>Dashboard</Card.Title>
                            <hr></hr>
                            <div style={{ display: "flex", gap: "60px", fontWeight: "bold" }} >
                                <Card.Text>
                                    Project
                                </Card.Text>
                                <Card.Text>
                                    User
                                </Card.Text>
                                <Card.Text>
                                    Role
                                </Card.Text>

                            </div>
                            <hr className='mt-0'></hr>
                            <div style={{ display: "flex", gap: "40px" }}>
                                <Card.Text>
                                    Project-1
                                </Card.Text>
                                <Card.Text>
                                    admin-1
                                </Card.Text>
                                <Card.Text>
                                    admin
                                </Card.Text>
                                <Card.Text>
                                    <Button>
                                        View Details
                                    </Button>
                                </Card.Text>
                            </div>
                            <div style={{ display: "flex", gap: "40px" }}>
                                <Card.Text>
                                    Project-2
                                </Card.Text>
                                <Card.Text>
                                    admin-2
                                </Card.Text>
                                <Card.Text>
                                    admin
                                </Card.Text>
                                <Card.Text>
                                    <Button>
                                        View Details
                                    </Button>
                                </Card.Text>
                            </div>
                            <div style={{ display: "flex", gap: "40px" }}>
                                <Card.Text>
                                    Project-3
                                </Card.Text>
                                <Card.Text>
                                    admin-3
                                </Card.Text>
                                <Card.Text>
                                    admin
                                </Card.Text>
                                <Card.Text>
                                    <Button>
                                        View Details
                                    </Button>
                                </Card.Text>
                            </div>
                            {/* <Button variant="primary">Go somewhere</Button> */}
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    </>
    );
}

export default SuperAdminDashboard;