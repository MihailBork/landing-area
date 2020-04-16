const db = require(`../../config/kotelnikovo.db`);
const _ = require('lodash');

module.exports = {
  addChildWork: async ({
    name, age, studyPlace, workAbout, work,
  }) => {
    const [row] = await db.query(
      `INSERT INTO child_works(name, age, study_place, work_about, work_file) VALUES (?, ?, ?, ?, ?)`,
      [name, age, studyPlace, workAbout, work],
    );
    return row;
  },
  addArchitectWork: async ({
    photo, name, age, studyPlace, workAbout, work,
  }) => {
    const [row] = await db.query(
      `INSERT INTO architect_works
      (photo_file, name, age, study_place, work_about, work_file)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [photo, name, age, studyPlace, workAbout, work],
    );
    return row;
  },
  getWorks: async () => {
    const [rows] = await db.query(`SELECT * FROM works`);
    return rows;
  },
  countChildWorks: async () => {
    const [rows] = await db.query(`SELECT COUNT(*) AS rowsCount FROM child_works`);
    return _.get(_.first(rows), `rowsCount`);
  },
  countArchitectWorks: async () => {
    const [rows] = await db.query(`SELECT COUNT(*) AS rowsCount FROM architect_works`);
    return _.get(_.first(rows), `rowsCount`);
  },
  getChildWorks: async ({ from, limit }) => {
    const [rows] = await db.query(`SELECT * FROM child_works LIMIT ?,?`, [from, limit]);
    return rows;
  },
  getArchitectWorks: async ({ from, limit }) => {
    const [rows] = await db.query(`SELECT * FROM architect_works LIMIT ?,?`, [from, limit]);
    return rows;
  },
};
