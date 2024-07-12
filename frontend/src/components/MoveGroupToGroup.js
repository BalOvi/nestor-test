import axios from "axios";
import React, { useEffect, useState } from "react";

const MoveGroupToGroup = ({ onSave }) => {
  const [groups, setGroups] = useState([]);
  const [formData, setFormData] = useState({ groupId: "", parentGroupId: "" });

  useEffect(() => {
    const fetchGroups = async () => {
      const groupsResponse = await axios.get("/api/groups");
      setGroups(groupsResponse.data);
    };
    fetchGroups();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/group/moveGroup", formData);
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Move Group to Group</h3>
      <div className="mb-3">
        <label className="form-label">Select Group to Move</label>
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
      <div className="mb-3">
        <label className="form-label">Select Parent Group</label>
        <select
          name="parentGroupId"
          className="form-control"
          value={formData.parentGroupId}
          onChange={handleChange}
        >
          <option value="">No Parent Group</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Move Group
      </button>
    </form>
  );
};

export default MoveGroupToGroup;
