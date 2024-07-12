import axios from "axios";
import React, { useEffect, useState } from "react";

const PersonList = ({ onEdit }) => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchPeople = async () => {
      const response = await axios.get("/api/people");
      setPeople(response.data);
    };
    fetchPeople();
  }, []);

  return (
    <div>
      <h2>People</h2>
      <ul className="list-group">
        {people.map((person) => (
          <li key={person.id} className="list-group-item">
            {person.firstName} {person.lastName} - {person.jobTitle}
            <button
              onClick={() => onEdit(person)}
              className="btn btn-sm btn-primary float-end"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonList;
