const mysql = require('mysql2/promise');
const express = require("express");
const app = express();

async function waitForDB() {
  const maxAttempts = 10; // Maximum number of attempts
  const delayMs = 1000; // Delay between attempts in milliseconds

  let attempts = 0;
  while (attempts < maxAttempts) {
    try {
      // Try to connect to the database
      const pool = mysql.createPool({
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'metalbrain',
        password: process.env.MYSQL_PASSWORD || 'London1983@@@!',
        database: process.env.MYSQL_DATABASE || 'world',
      });

      console.log('Database is available...Starting server...');
      return pool; // Return the connection
    } catch (error) {
      console.error('Error connecting to database:', error.message);
      attempts++;
      await new Promise(resolve => setTimeout(resolve, delayMs)); // Wait before the next attempt
    }
  }

  console.error('Max attempts reached. Unable to connect to database.');
  throw new Error('Unable to connect to database');
}

module.exports = waitForDB;


// const mysql = require('mysql2/promise');
// const express = require("express");
// const app = express();

// async function waitForDB() {
//   const maxAttempts = 10; // Maximum number of attempts
//   const delayMs = 1000; // Delay between attempts in milliseconds

//   let attempts = 0;
//   while (attempts < maxAttempts) {
//     try {
//       // Try to connect to the database
//       const pool = mysql.createPool({
//         host: process.env.MYSQL_HOST || 'localhost',
//         user: process.env.MYSQL_USER || 'root',
//         password: process.env.MYSQL_PASSWORD || 'LondonDev1983@@%&!',
//         database: process.env.MYSQL_DATABASE || 'world',
//       });

//       console.log('Database is available...Starting server...');
//       return pool; // Return the connection
//     } catch (error) {
//       console.error('Error connecting to database:', error.message);
//       attempts++;
//       await new Promise(resolve => setTimeout(resolve, delayMs)); // Wait before the next attempt
//     }
//   }

//   console.error('Max attempts reached. Unable to connect to database.');
//   throw new Error('Unable to connect to database');
// }

// module.exports = waitForDB;





