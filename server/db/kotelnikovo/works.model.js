const db = require('../../config/kotelnikovo.db');

module.exports = {
    addWork: async ({ name, photo, about, work }) => {
        const [row] = await db.query(
            "INSERT INTO works(name, photo, about, work) VALUES (?, ?, ?, ?)",
            [name, photo, about, work]
        );
        return row;
    },
    getWorks: async () => {
        const [rows] = await db.query("SELECT * FROM works");
        return rows;
    },
};
