import axios from "axios";
import React, { useEffect, useState } from "react";

const GroupForm = ({ group, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    parentGroupId: "",
  });

  useEffect(() => {
    if (group) {
      setFormData({
        name: group.name || "",
        parentGroupId:
          group.parentGroupId !== undefined && group.parentGroupId !== null
            ? group.parentGroupId
            : "",
      });
    } else {
      setFormData({ name: "", parentGroupId: "" });
    }
  }, [group]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (group) {
      await axios.put(`/api/group/${group.id}`, formData);
    } else {
      await axios.post("/api/group", formData);
    }
    onSave();
    setFormData({ name: "", parentGroupId: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Group Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Parent Group ID</label>
        <input
          type="text"
          className="form-control"
          name="parentGroupId"
          value={formData.parentGroupId}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
};

export default GroupForm;
