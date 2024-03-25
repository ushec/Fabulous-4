// Exporting a middleware function
const path = require('path');

function appMiddleware(req, res, next) {
    console.log('Middleware function called......');
    res.setHeader('X-Custom-Header', 'Hello from appMiddleware');
    res.setHeader('Content-Type', 'text/css');
    res.setHeader('Content-Type', 'application/javascript');
    console.log(`Request Method: ${req.method}`);
    console.log(`Request URL: ${req.url}`);
    next();
}

// logger.js
function logger(req, res, next) {
    // Log the request method and URL
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    // Proceed to the next middleware or route handler
    next();
  }

module.exports = {
    appMiddleware,
    logger
}




