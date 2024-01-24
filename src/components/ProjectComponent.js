// ProjectComponent.js
import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const ProjectComponent = ({ project }) => {
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={project.image_url} alt="Project" />
                <Card.Body>
                    <Card.Title>{project.project_name}</Card.Title>

                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Food Name: {project.food_name}</ListGroup.Item>
                    <ListGroup.Item>Calories: {project.calories}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
            </Card>
            {/* <h3>{project.project_name}</h3>
            <p>Food Name: {project.food_name}</p>
            <p>Calories: {project.calories}</p>
            <img src={project.image_url} alt="Project" /> */}
        </div>
    );
};

export default ProjectComponent;
