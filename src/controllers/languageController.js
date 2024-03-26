// This file contains the controller functions for the language routes.
// This file will contain the controller functions for the language routes.
const countryLanguageModel = require('../model/countryLanguage.js');

module.exports = {
  async getAllLanguages(req, res) {
    try {
      const languages = await countryLanguageModel.getLanguages();
      res.json(languages);
    } catch (error) {
      console.error('Error fetching languages:', error);
      res.status(500).json({ error: 'Error fetching languages' });
    }
  },

  async searchLanguage(req, res) {
    try {
      const languageName = req.body.languageName;
      const languageInfo = await countryLanguageModel.searchLanguageInDatabase(languageName);
      if (languageInfo) {
        res.render('searchResult', { languageInfo });
        console.log(languageInfo);
      } else {
        res.render('searchResult', { error: 'Language not found' });
      }
    } catch (error) {
      console.error('Error searching for language:', error);
      res.status(500).send('Internal Server Error');
    }
  },
};
