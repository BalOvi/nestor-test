import React, { useState } from "react";
import PersonForm from "../components/PersonForm";
import PersonList from "../components/PersonList";

const PeoplePage = () => {
  const [editingPerson, setEditingPerson] = useState(null);

  const handleSave = () => {
    setEditingPerson(null);
  };

  return (
    <div className="container">
      <h1>People Management</h1>
      <PersonForm person={editingPerson} onSave={handleSave} />
      <PersonList onEdit={setEditingPerson} />
    </div>
  );
};

export default PeoplePage;
