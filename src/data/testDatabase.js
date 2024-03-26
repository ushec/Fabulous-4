const waitForDB  = require('../data/database.js');


async function logDBversion() {
    try {
        const pool = await waitForDB();
        const connection = await pool.getConnection();
        const [rows, fields] = await connection.query('SELECT VERSION() AS version');
        const version = rows[0].version;
        console.log(`Database Version:', ${version}`);
        connection.release();
    } catch (error) {
        console.error('Error occurred while connecting to the database:', error);
        throw error;
    }
}

module.exports = logDBversion;
    