// routes/index.js
const express = require('express');
const dotenv = require('dotenv');
const router = express.Router();
const path = require('path');
const waitForDB = require('../data/database');
const { logDBversion } = require('../data/testDatabase');
const languageController = require('../controllers/languageController');
const continentController = require('../controllers/continentController');
const { StudentController } = require('../controllers/studentController');
const cityController = require('../controllers/cityController.js');
const countryController = require('../controllers/countryController.js');
const { searchCityInDatabase } = require('../model/cityModel.js');
const { searchCountryInDatabase } = require('../model/countryModel.js');
const { searchLanguageInDatabase } = require('../model/countryLanguage.js');
const { User } = require("../model/user.js");
const appSetup = require('../appSetup');
dotenv.config();
const bodyParser = require('body-parser');
const app = express();  

// Set the sessions
var session = require('express-session');
router.use(session({
 secret: 'secretkeysdfjsflyoifasd',
 resave: false,
 saveUninitialized: true,
 cookie: { secure: false }
}));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.json());


// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.json());

app.use(router)


// Use the router from appSetup.js
router.use('/pug', appSetup);

// Create a route for root - /
router.get("/", function(req, res) {
  console.log(req.session);
  if (req.session.uid) {
  res.send('Welcome back, ' + req.session.uid + '!');
  } else {
  res.send('Please login to view this page!');
  }
  res.end();
 });

// router.post("/search", cityController.searchCity);
// router.post("/search", countryController.searchCountry);
// router.post("/search", languageController.searchLanguage);

router.get("/search", (req, res) => {
  // Render the search form view
  res.render('searchForm');
});

// Register
router.get('/register', function (req, res) {
  res.render('register');
 });

router.post('/set-password', function (req, res) {
  params = req.body;
  var user = new User(params.email);
  try {
    user.getIdFromEmail().then( uId => {
      if(uId) {
        user.setUserPassword(params.password).then ( result => {
          res.redirect('/menu/');
        });
      }
      else {
        // If no existing user is found, add a new one
        user.addUser(params.email).then( Promise => {
        res.send('Perhaps a page where a new user sets a programme would')
         });
      }
    })
  } catch (err) {
    console.error(`Error while adding password `, err.message);
  }
 });
 
 // Login
 router.get('/login', function (req, res) {
  res.render('login');
 });

 router.post('/authenticate', function (req, res) {
  params = req.body;
  var user = new User(params.email);
  try {
    user.getIdFromEmail().then(uId => {
      if (uId) {
        user.authenticate(params.password).then(match => {
          if (match) {
            // Set the session for this user
            req.session.uid = uId;
            req.session.loggedIn = true;
            res.redirect('/menu/');
          }
          else {
            // TODO improve the user journey here
            res.send()
            res.send('invalid password');
          }
      });
    }
    else {
      res.send('invalid email');
    }
  })
  } catch (err) {
      console.error(`Error while comparing `, err.message);
  }
 });

 // Logout
router.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/login');
  });

// // Define route handler for POST requests to "/search"
// router.post("/search", async (req, res) => {
//   try {
//       const cityName = req.body.cityName;
//       // Perform search logic here...
//       res.render('searchResult', { cityInfo });
//       // res.send(`Searching for city: ${cityName}`);
//   } catch (error) {
//       console.error('Error searching for city:', error);
//       res.status(500).send('Internal Server Error');
//   }
// });

router.post("/search", async (req, res) => {
  try {
    const { searchType, searchInput } = req.body;

    let searchResult;
    console.log('searchType:', searchType);
    console.log('searchInput:', searchInput);

    if (searchType === "city") {
      searchResult = await searchCityInDatabase(searchInput);
    } else if (searchType === "country") {
      searchResult = await searchCountryInDatabase(searchInput);
    } else if (searchType === "countrylanguage") {
      searchResult = await searchLanguageInDatabase(searchInput);
    } else {
      return res.status(400).send("Invalid search type");
    }

    // Check if searchResult is null
    if (!searchResult) {
      return res.render("noResult"); // Render a template indicating no results found
    }

    // Render the search result template with the searchResult data
    res.render("searchResult", { searchResult });
  } catch (error) {
    console.error('Error searching:', error);
    res.status(500).send('Internal Server Error');
  }
});


// to get country columns. 
router.get("/countries", async (req, res) => {
    try {
        // Establish a database connection
        const pool = await waitForDB();
        // Execute the query to fetch countries data
        const [rows, fields] = await pool.execute("SELECT Code, Name, Continent, Region, Population FROM country");
        // Render the response using fetched data
        res.render('country', { countries: rows }); // Assuming you have a view file named "countries.pug"
    } catch (error) {
        console.error('Error fetching countries:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.get("/continent", async (req, res) => {
    try {
      // Establish a database connection
      const pool = await waitForDB();
      // Execute the query to fetch continents
      const [rows, fields] = await pool.execute("SELECT DISTINCT continent FROM country");
      // Render the response using fetched data
      res.render('continent', { continent:rows });
    } catch (error) {
      console.error('Error fetching continents:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  router.get("/cities", async (req, res) => {
    try {
        // Establish a database connection
        const pool = await waitForDB();
        // Execute the query to fetch countries data
        const [rows, fields] = await pool.execute("SELECT Name, CountryCode, District, Population FROM city");
        // Render the response using fetched data
        res.render('city', { cities: rows }); // Assuming you have a view file named "countries.pug"
    } catch (error) {
        console.error('Error fetching cities:', error);
        res.status(500).send('Internal Server Error');
    }
});


// router.get('/students/:id', (req, res) => {
//     const studentController = new StudentController();
//     studentController.getStudentById(req, res);
// });

router.get('/students/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        const studentController = new StudentController();
        const student = await studentController.getStudentById(studentId);
        res.json(student);
    } catch (error) {
        // Custom error handling based on error type
        if (error instanceof SyntaxError) {
            res.status(400).json({ error: "Invalid request syntax" });
        } else if (error.code === 'ENOENT') {
            res.status(404).json({ error: "Student not found" });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
});


// Apply middleware for all routes
router.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl)
    console.log('Request Type:', req.method)
    next()
})


module.exports = router;
