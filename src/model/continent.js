const mysql = require('mysql2/promise.js');
const waitForDB  = require('../data/database.js');

// // Function to fetch continents from the country table
// async function getContinents() {
//     try {
//         const connection = await waitForDB();
//         return new Promise((resolve, reject) => {
//             connection.query("SELECT continent FROM country", (err, rows) => {
//                 if (err) {
//                     console.error('Error fetching continents:', err);
//                     reject(err);
//                 } else {
//                     console.log(`/continent: ${rows.length} rows`);
//                     resolve(rows);
//                 }
//             });
//         });
//     } catch (error) {
//         console.error('Error occurred while fetching continents:', error.message);
//         throw error;
//     }
// }

// module.exports = { getContinents };

async function getContinents() {
    try {
        const connection = await waitForDB();
        const [rows] = await connection.query("SELECT DISTINCT continent FROM country"); // Using await to execute the query

        console.log(`/continent: ${rows.length} rows`);
        return rows; // Returning the rows directly
    } catch (error) {
        console.error('Error occurred while fetching continents:', error.message);
        throw error;
    }
}

module.exports = { getContinents };

