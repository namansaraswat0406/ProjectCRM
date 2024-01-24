// PersonComponent.js
import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const PersonComponent = ({ person }) => {
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={person.image_url} alt="Person" />
                <Card.Body>
                    <Card.Title>{person.first_name} {person.last_name}</Card.Title>

                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Address: {person.address}</ListGroup.Item>
                    <ListGroup.Item>Phone Number: {person.phone_number}</ListGroup.Item>
                    {/* <ListGroup.Item><img src={person.image_url} alt="Person" /></ListGroup.Item> */}
                </ListGroup>
                <Card.Body>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
            </Card>

        </div>
    );
};

export default PersonComponent;
