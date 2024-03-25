const mysql = require('mysql2');
const waitForDB = require('../data/database.js');

// Function to fetch languages from the countrylanguage table
async function getLanguages() {
    try {
      const connection = await waitForDB();
      return new Promise((resolve, reject) => {
        connection.query("SELECT CountryCode, Language, IsOfficial, Percentage  * FROM countrylanguage", (err, rows) => {
          if (err) {
            console.error('Error fetching languages:', err);
            reject(err);
          } else {
            console.log(`/language: ${rows.length} rows`);
            resolve(rows);
          }
        });
      });
    } catch (error) {
      console.error('Error occurred while fetching languages:', error.message);
      throw error;
    }
  }

  // Function to search for a language in the countrylanguage table
  async function searchLanguageInDatabase(languageName) {
    try {
      const connection = await waitForDB();
      const [rows] = await connection.query("SELECT * FROM countrylanguage WHERE Language = ?", [languageName]);
      if (rows.length > 0) {
        return rows[0]; // Return the first matching language
      } else {
        return null; // Language not found
      }
    } catch (error) {
      console.error('Error occurred while searching for language:', error.message);
      throw error;
    }
  }
  
module.exports = { getLanguages, searchLanguageInDatabase };
  