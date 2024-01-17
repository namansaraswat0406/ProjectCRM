import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const UserFoodForm = () => {
    const [userData, setUserData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        gender: '',
        address: '',
        phoneNumber: '',

        registrationDate: '',
        role: '',
    });

    const [foodDataList, setFoodDataList] = useState([
        {
            foodName: '',
            category: '',
            calories: '',

            imageUrl: '',
        },
    ]);

    const [userDataFromServer, setUserDataFromServer] = useState(null);

    const handleUserChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleFoodChange = (e, index) => {
        const { name, value, type, checked } = e.target;
        const newFoodDataList = [...foodDataList];
        newFoodDataList[index] = {
            ...newFoodDataList[index],
            [name]: type === 'checkbox' ? checked : value,
        };
        setFoodDataList(newFoodDataList);
    };

    const handleAddFood = () => {
        setFoodDataList([...foodDataList, { /* Initial food details for a new entry */ }]);
    };

    const handleDeleteFood = (index) => {
        const newFoodDataList = [...foodDataList];
        newFoodDataList.splice(index, 1);
        setFoodDataList(newFoodDataList);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send user data to the server
            const userResponse = await axios.post('http://localhost:5000/create_users_table', userData);
            const userId = userResponse.data.user_id;

            // Send each food entry to the server, using the generated userId
            await Promise.all(
                foodDataList.map(async (foodData) => {
                    await axios.post(`http://localhost:5000/create_food_table/${userId}`, foodData);
                })
            );

            // Optionally, you can reset the form or perform other actions after submission
            setUserData({
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                age: '',
                gender: '',
                address: '',
                phoneNumber: '',
                registrationDate: '',
                role: '',
            });

            setFoodDataList([
                {
                    foodName: '',
                    ingredients: '',
                    calories: '',

                    imageUrl: '',
                },
            ]);

            // Fetch user data from the server after adding a new user
            const response = await axios.get(`http://localhost:5000/get_user_data/${userId}`);
            setUserDataFromServer(response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    useEffect(() => {
        // Example: Fetch user data for user_id 1
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get_user_data/1');
                setUserDataFromServer(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        // Call the fetchUserData function
        fetchUserData();
    }, []); // Empty dependency array ensures the effect runs only once

    return (
        <Container>
            {/* Display user data from the server */}
            {userDataFromServer && (
                <div>
                    <h3>User Data from Server:</h3>
                    <pre>{JSON.stringify(userDataFromServer, null, 2)}</pre>
                </div>
            )}

            {/* User Information */}
            <h2>User Information</h2>
            <Row>
                <Col>
                    <Form.Group controlId="username">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" name="username" value={userData.username} onChange={handleUserChange} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="firstName">
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control type="text" name="firstName" value={userData.firstName} onChange={handleUserChange} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="lastName">
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control type="text" name="lastName" value={userData.lastName} onChange={handleUserChange} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="email">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" name="email" value={userData.email} onChange={handleUserChange} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="age">
                        <Form.Label>Age:</Form.Label>
                        <Form.Control type="text" name="age" value={userData.age} onChange={handleUserChange} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="gender">
                        <Form.Label>Gender:</Form.Label>
                        <Form.Control type="text" name="gender" value={userData.gender} onChange={handleUserChange} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="adress">
                        <Form.Label>address:</Form.Label>
                        <Form.Control type="text" name="address" value={userData.address} onChange={handleUserChange} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="phoneNumber">
                        <Form.Label>Phone Number:</Form.Label>
                        <Form.Control type="phone" name="phoneNumber" value={userData.phoneNumber} onChange={handleUserChange} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="registrationDate">
                        <Form.Label>Registration Date:</Form.Label>
                        <Form.Control type="Date" name="date" value={userData.registrationDate} onChange={handleUserChange} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="role">
                        <Form.Label>Role</Form.Label>
                        <Form.Control type="text" name="role" value={userData.role} onChange={handleUserChange} />
                    </Form.Group>
                </Col>
                {/* Add other user input fields as needed */}
                {/* ... */}
            </Row>

            {/* Food Information */}
            <h2>Food Information</h2>
            {foodDataList.map((foodData, index) => (
                <div key={index}>
                    <Row>
                        <Col>
                            <Form.Group controlId={`foodName${index}`}>
                                <Form.Label>Food Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="foodName"
                                    value={foodData.foodName}
                                    onChange={(e) => handleFoodChange(e, index)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId={`category${index}`}>
                                <Form.Label>Category:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="category"
                                    value={foodData.category}
                                    onChange={(e) => handleFoodChange(e, index)}
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId={`calories${index}`}>
                                <Form.Label>Calories:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="calories"
                                    value={foodData.calories}
                                    onChange={(e) => handleFoodChange(e, index)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId={`calories${index}`}>
                                <Form.Label>Image:</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="imageUrl"
                                    value={foodData.imageUrl}
                                    onChange={(e) => handleFoodChange(e, index)}
                                />
                            </Form.Group>
                        </Col>
                        {/* Add other food input fields as needed */}
                        {/* ... */}
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="danger" onClick={() => handleDeleteFood(index)}>
                                Delete
                            </Button>
                        </Col>
                    </Row>
                </div>
            ))}
            <Button variant="secondary" onClick={handleAddFood}>
                Add Food
            </Button>

            {/* Buttons */}
            <Row>
                <Col>
                    <Button type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default UserFoodForm;
