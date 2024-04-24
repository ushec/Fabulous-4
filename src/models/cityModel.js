const mysql = require('mysql2/promise.js');
const waitForDB  = require('../data/database.js');

async function getCities() {
    try {
        const connection = await waitForDB();
        const [rows] = await connection.query("SELECT Name, CountryCode, District, Population FROM city");

        console.log(`/cities: ${rows.length} rows`);
        return rows;
    } catch (error) {
        console.error('Error occurred while fetching cities:', error.message);
        throw error;
    }
}

async function searchCityInDatabase(cityName) {
    try {
      const connection = await waitForDB();
      const [rows] = await connection.query("SELECT * FROM city WHERE Name = ?", [cityName]);
      if (rows.length > 0) {
        return rows[0]; // Return the first matching city
      } else {
        return null; // City not found
      }
    } catch (error) {
      console.error('Error occurred while searching for city:', error.message);
      throw error;
    }
  }

module.exports = { getCities, searchCityInDatabase };