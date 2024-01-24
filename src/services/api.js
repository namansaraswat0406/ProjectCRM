// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; // Adjust the base API endpoint if needed

export const getPersons = () => axios.get(`${API_URL}/persons`);
export const getProjects = () => axios.get(`${API_URL}/projects`);
