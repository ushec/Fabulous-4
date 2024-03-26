const mysql = require('mysql2/promise.js');
const waitForDB  = require('../data/database.js');

async function getCountries() {
    try {
        const connection = await waitForDB();
        const [rows] = await connection.query("SELECT Code, Name, Continent, Region, SurfaceArea, IndepYear, LifeExpectancy, Population, Capital FROM country");

        console.log(`/countries: ${rows.length} rows`);
        return rows;
    } catch (error) {
        console.error('Error occurred while fetching countries:', error.message);
        throw error;
    }
}

async function searchCountryInDatabase(countryName) {
    try {
      const connection = await waitForDB();
      const [rows] = await connection.query("SELECT Code, Name, Continent, Region, SurfaceArea, IndepYear, LifeExpectancy, Population, Capital FROM country WHERE Name = ?", [countryName]);
      if (rows.length > 0) {
        return rows[0]; // Return the first matching country
      } else {
        return null; // Country not found
      }
    } catch (error) {
      console.error('Error occurred while searching for country:', error.message);
      throw error;
    }
  }

  module.exports = { getCountries, searchCountryInDatabase };