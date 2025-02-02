import { useState, useEffect } from 'react';
import Person from '../Person/Person';
import '../PersonController/PersonController.css';

function PersonController() {
  const [person, setPerson] = useState(null);

  const getPerson = async () => {
    try {
      const response = await fetch('https://www.randomuser.me/api?results=1');
      const data = await response.json();
      const { first: firstName, last: lastName } = data.results[0].name;
      const email = data.results[0].email; 
      setPerson({ firstName, lastName, email });
    } catch (error) {
      console.error('Error fetching person:', error);
    }
  };

  useEffect(() => {
    getPerson();
  }, []);

  return (
    <div className="person-controller">
      <button className="get-person-btn" onClick={getPerson}>Get Random Person</button>
      <Person person={person} />
    </div>
  );
}

export default PersonController;
