import connection from '../database/db';
import { Person } from '../models/person';

export const createPerson = async (person: Person): Promise<any> => {
  const [result] = await connection.execute(
    'INSERT INTO Person (firstName, lastName, jobTitle) VALUES (?, ?, ?)',
    [person.firstName, person.lastName, person.jobTitle]
  );
  return result;
};

export const updatePerson = async (id: number, person: Person): Promise<any> => {
  const [result] = await connection.execute(
    'UPDATE Person SET firstName = ?, lastName = ?, jobTitle = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
    [person.firstName, person.lastName, person.jobTitle, id]
  );
  return result;
};

export const getPeople = async (): Promise<any> => {
  const [rows] = await connection.query('SELECT * FROM Person');
  return rows;
};
