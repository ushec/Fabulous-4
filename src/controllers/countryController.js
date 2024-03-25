const countryModel = require('../model/countryModel.js');

module.exports = {
  async getAllCountries(req, res) {
    try {
      const countries = await countryModel.getCountries();
      res.json(countries);
    } catch (error) {
      console.error('Error fetching countries:', error);
      res.status(500).json({ error: 'Error fetching cities' });
    }
  },

  async searchCountry(req, res) {
    try {
      const countryName = req.body.countryName;
      const countryInfo = await countryModel.searchCountryInDatabase(countryName);
      if (countryInfo) {
        res.render('searchResult', { countryInfo });
        console.log(countryInfo);
      } else {
        res.render('searchResult', { error: 'Country not found' });
      }
    } catch (error) {
      console.error('Error searching for country:', error);
      res.status(500).send('Internal Server Error');
    }
  },
};