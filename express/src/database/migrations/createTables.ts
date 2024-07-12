import connection from "../db";

const createTables = async () => {
  try {
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS Person (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(100) NOT NULL,
        lastName VARCHAR(100) NOT NULL,
        jobTitle VARCHAR(100),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS \`Group\` (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        parentGroupId INT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (parentGroupId) REFERENCES \`Group\`(id)
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS GroupPerson (
        groupId INT,
        personId INT,
        PRIMARY KEY (groupId, personId),
        FOREIGN KEY (groupId) REFERENCES \`Group\`(id),
        FOREIGN KEY (personId) REFERENCES Person(id)
      )
    `);

    console.log("Tables created successfully.");
  } catch (error) {
    console.error("Error creating tables:", error);
  } finally {
    connection.end();
  }
};

createTables();
