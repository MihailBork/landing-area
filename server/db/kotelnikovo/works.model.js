const db = require(`../../config/kotelnikovo.db`);

module.exports = {
  addChildWork: async ({
    name, photo, about, work,
  }) => {
    const [row] = await db.query(
      `INSERT INTO child_works(name, photo, about, work) VALUES (${name}, ${photo}, ${about}, ${work})`,
    );
    return row;
  },
  addArchitectWork: async ({
    name, photo, about, work,
  }) => {
    const [row] = await db.query(
      `INSERT INTO architect_works(name, photo, about, work) VALUES (${name}, ${photo}, ${about}, ${work})`,
    );
    return row;
  },
  getChildWorks: async () => {
    const [rows] = await db.query(`SELECT * FROM child_works`);
    return rows;
  },
  getArchtectWorks: async () => {
    const [rows] = await db.query(`SELECT * FROM architect_works`);
    return rows;
  },
};
