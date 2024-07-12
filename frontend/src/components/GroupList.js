import axios from "axios";
import React, { useEffect, useState } from "react";

const GroupList = ({ onEdit, refreshTrigger }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await axios.get("/api/groups");
      setGroups(response.data);
    };
    fetchGroups();
  }, [refreshTrigger]);

  return (
    <div>
      <h2>Groups</h2>
      <ul className="list-group">
        {groups.map((group) => (
          <li key={group.id} className="list-group-item">
            {group.name}
            <button
              onClick={() => onEdit(group)}
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

export default GroupList;
