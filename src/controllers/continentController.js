// This file contains the controller functions for continent routes.
const continent = require('../model/continent.js');

module.exports = {
  async getAllContinent(req, res) {
    try {
      const continents = await continent.getContinents();
      res.json(continents);
    } catch (error) {
      console.error('Error fetching continents:', error);
      res.status(500).json({ error: 'Error fetching continent' });
    }
  },

  // Define other controller functions for specific routes...
};