import axios from "axios";
import React, { useEffect, useState } from "react";

const MovePersonToGroup = ({ onSave }) => {
  const [people, setPeople] = useState([]);
  const [groups, setGroups] = useState([]);
  const [formData, setFormData] = useState({ groupId: "", personId: "" });

  useEffect(() => {
    const fetchPeopleAndGroups = async () => {
      const peopleResponse = await axios.get("/api/people");
      const groupsResponse = await axios.get("/api/groups");
      setPeople(peopleResponse.data);
      setGroups(groupsResponse.data);
    };
    fetchPeopleAndGroups();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/group/movePerson", formData);
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Move Person to Group</h3>
      <div className="mb-3">
        <label className="form-label">Select Person</label>
        <select
          name="personId"
          className="form-control"
          value={formData.personId}
          onChange={handleChange}
          required
        >
          <option value="">Select Person</option>
          {people.map((person) => (
            <option key={person.id} value={person.id}>
              {person.firstName} {person.lastName}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Select Group</label>
        <select
          name="groupId"
          className="form-control"
          value={formData.groupId}
          onChange={handleChange}
          required
        >
          <option value="">Select Group</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Move Person
      </button>
    </form>
  );
};

export default MovePersonToGroup;
