const cityModel = require('../model/cityModel.js');

module.exports = {
  async getAllCities(req, res) {
    try {
      const cities = await cityModel.getCities();
      res.json(cities);
    } catch (error) {
      console.error('Error fetching cities:', error);
      res.status(500).json({ error: 'Error fetching cities' });
    }
  },

  async searchCity(req, res) {
    try {
      const cityName = req.body.cityName;
      const cityInfo = await cityModel.searchCityInDatabase(cityName);
      if (cityInfo) {
        res.render('searchResult', { cityInfo });
        console.log(cityInfo);
      } else {
        res.render('searchResult', { error: 'City not found' });
      }
    } catch (error) {
      console.error('Error searching for city:', error);
      res.status(500).send('Internal Server Error');
    }
  },
};

  // Define other controller functions for specific routes...


