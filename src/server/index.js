// Import express.js
const express = require('express');
path = require('path');
const bodyParser = require('body-parser');
const router = require('../routes/index.js');
const dotenv = require('dotenv');
const app = express();
const logDBversion  = require('../data/testDatabase');

// Parse incoming request bodies with JSON payloads
app.use(bodyParser.json());

// Parse incoming request bodies with URL-encoded payloads
app.use(bodyParser.urlencoded({ extended: true }));

// Apply router middleware
app.use("/",router);

// Set the view engine to Pug
app.set('view engine', 'pug');

// Set the views directory
app.set('views', path.join(__dirname, '..', 'views'));

// Serve static files with correct MIME types
app.use(express.static(path.join(__dirname, '..', 'public'), {
    setHeaders: (res, path) => {
      if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'text/javascript');
      }
    }
  }));

const { logger, appMiddleware } = require('../middleware/middleware.js');
// Apply custom middleware
app.use(logger);
app.use(appMiddleware);

// load environment variables
dotenv.config();

// handle start server
async function startServer() {
    try {
        await logDBversion();
    } catch (error) {
        console.error('Error occurred while starting the server:', error);
        process.exit(1);
    }
}

// Start the server
startServer();
app.listen(process.env.PORT,function(){
 console.log(`Server running at http://127.0.0.1:3000/`);
});

module.exports = app;