import connection from '../database/db';
import { Group, Member } from '../models/group';

export const createGroup = async (group: Group): Promise<any> => {
  const [result] = await connection.execute(
    'INSERT INTO `Group` (name, parentGroupId) VALUES (?, ?)',
    [group.name, group.parentGroupId || null]
  );
  return result;
};

export const updateGroup = async (id: number, group: Partial<Group>): Promise<any> => {
  const [result] = await connection.execute(
    'UPDATE `Group` SET name = ?, parentGroupId = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
    [group.name, group.parentGroupId, id]
  );
  return result;
};
export const getGroups = async (): Promise<any> => {
  const [rows] = await connection.query('SELECT * FROM `Group`');
  return rows;
};

export const getGroupsDetails = async (): Promise<Group[]> => {
  const [groupsResult] = await connection.query('SELECT * FROM `Group`');
  const [membersResult] = await connection.query('SELECT `Person`.*, `GroupPerson`.groupId FROM `Person` INNER JOIN `GroupPerson` ON `Person`.id = `GroupPerson`.personId');

  const groups = groupsResult as Group[];
  const members = membersResult as (Member & { groupId: number })[];

  const groupMap: { [key: number]: Group } = {};

  // Initialize groups with empty members and subgroups
  groups.forEach(group => {
    groupMap[group.id] = { ...group, members: [], subgroups: [] };
  });

  // Assign members to their respective groups
  members.forEach(member => {
    if (groupMap[member.groupId]) {
      groupMap[member.groupId].members.push(member);
    }
  });

  // Build the hierarchical structure
  const structuredGroups: Group[] = [];
  Object.values(groupMap).forEach(group => {
    if (group.parentGroupId !== null && groupMap[group.parentGroupId]) {
      groupMap[group.parentGroupId].subgroups.push(group);
    } else {
      structuredGroups.push(group);
    }
  });

  return structuredGroups;
};

export const movePersonToGroup = async (groupId: number, personId: number): Promise<any> => {
  const [result] = await connection.execute(
    'INSERT INTO GroupPerson (groupId, personId) VALUES (?, ?) ON DUPLICATE KEY UPDATE groupId = VALUES(groupId)',
    [groupId, personId]
  );
  return result;
};

export const moveGroupToGroup = async (groupId: number, parentGroupId: number | null): Promise<any> => {
  const [result] = await connection.execute(
    'UPDATE `Group` SET parentGroupId = ? WHERE id = ?',
    [parentGroupId, groupId]
  );
  return result;
};
