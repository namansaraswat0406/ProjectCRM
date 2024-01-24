// src/DetailsPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { getPersons, getProjects } from './services/api';
import PersonComponent from './PersonComponent';
import ProjectComponent from './ProjectComponent';
import { getPersons, getProjects } from '../services/api';

const DetailsPage = () => {
  const { id, type } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type === 'person') {
          const response = await getPersons();
          const person = response.data.find((p) => p.person_id === parseInt(id, 10));
          setData(person);
        } else if (type === 'project') {
          const response = await getProjects();
          const project = response.data.find((p) => p.project_id === parseInt(id, 10));
          setData(project);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, type]);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {type === 'person' && <PersonComponent person={data} />}
      {type === 'project' && <ProjectComponent project={data} />}
      {/* Add more details based on the data structure */}
      <p>
        <strong>ID:</strong> {data.id}
      </p>
    </div>
  );
};

export default DetailsPage;
