import React, { useState } from "react";
import GroupForm from "../components/GroupForm";
import GroupList from "../components/GroupList";
import MoveGroupToGroup from "../components/MoveGroupToGroup";
import MovePersonToGroup from "../components/MovePersonToGroup";

const GroupsPage = () => {
  const [editingGroup, setEditingGroup] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSave = () => {
    setEditingGroup(null);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="container">
      <h1>Group Management</h1>
      <GroupForm group={editingGroup} onSave={handleSave} />
      <GroupList onEdit={setEditingGroup} refreshTrigger={refreshTrigger} />
      <MovePersonToGroup onSave={handleSave} />
      <MoveGroupToGroup onSave={handleSave} />
    </div>
  );
};

export default GroupsPage;
