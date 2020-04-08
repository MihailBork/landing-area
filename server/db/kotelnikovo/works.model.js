const db = require(`../../config/kotelnikovo.db`);

module.exports = {
  addWork: async ({
    name, photo, about, work, competition,
  }) => {
    const [row] = await db.query(
      `INSERT INTO works(name, photo, about, work) VALUES (${name}, ${photo}, ${about}, ${work}, ${competition})`,
    );
    return row;
  },
  getWorks: async () => {
    const [rows] = await db.query(`SELECT * FROM works`);
    return rows;
  },
  getChildWorks: async () => {
    const [rows] = await db.query(`SELECT * FROM works WHERE competition='child'`);
    return rows;
  },
  getArchitectWorks: async () => {
    const [rows] = await db.query(`SELECT * FROM works WHERE competition='architect'`);
    return rows;
  },
};
