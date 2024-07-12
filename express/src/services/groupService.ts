import connection from '../database/db';
import { Group } from '../models/group';

export const createGroup = async (group: Group): Promise<any> => {
  const [result] = await connection.execute(
    'INSERT INTO `Group` (name, parentGroupId) VALUES (?, ?)',
    [group.name, group.parentGroupId || null]
  );
  return result;
};

export const updateGroup = async (id: number, group: Group): Promise<any> => {
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
