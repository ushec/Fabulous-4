// Import express.js
const express = require("express");
// Create express app
const app = express();

const port = 3000;


// Create a get for root - /
app.get("/", function (req, res) {
    res.send("Hello world!!");
});

// Create a route for /goodbye
// Responds to a 'GET' request
app.get("/goodbye", function (req, res) {
    res.send("Goodbye world!");
});

// Create a dynamic route for /hello/<name>, where name is any value provided by us// At the end of the URL
// Responds to a 'GET' request
app.get("/hello/:name", function (req, res) {
    // req.params contains any parameters in the request
    // We can examine it in the console for debugging purposes
    console.log(req.params);
    // Retrieve the 'name' parameter and use it in a dynamically generated page
    res.send("Hello " + req.params.name);
});

// Start server on port
app.listen(port, function () {
    console.log(`Server running on port ${port}`);
});