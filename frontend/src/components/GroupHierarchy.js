import axios from "axios";
import React, { useEffect, useState } from "react";

const GroupHierarchy = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await axios.get("/api/groups/details");
      setGroups(response.data);
    };
    fetchGroups();
  }, []);

  const renderGroup = (group) => {
    return (
      <li key={group.id}>
        <strong>{group.name}</strong>
        <ul>
          {group.members.map((member) => (
            <li key={member.id}>
              {member.firstName} {member.lastName}
            </li>
          ))}
          {group.subgroups.length > 0 && (
            <ul>{group.subgroups.map((subgroup) => renderGroup(subgroup))}</ul>
          )}
        </ul>
      </li>
    );
  };

  return (
    <div>
      <h2>Group Hierarchy</h2>
      <ul>{groups.map((group) => renderGroup(group))}</ul>
    </div>
  );
};

export default GroupHierarchy;
