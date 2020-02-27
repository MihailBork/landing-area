const db = require('../config/database');

module.exports = {
    getUserById: async id => {
        const [row] = await db.query("SELECT * FROM users WHERE id=?", [id]);
        return row;
    },
    getUserByLogin: async login => {
        const [row] = await db.query("SELECT * FROM users WHERE login=?", [login]);
        return row;
    },
    getUsers: async () => {
        const [rows] = await db.query("SELECT * FROM users");
        return rows;
    },
};
