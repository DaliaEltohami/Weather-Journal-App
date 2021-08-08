// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Require cors and body-parser
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
// Define variable to hold port number
const port = '8000';
// Use express instance to run the server on port 8000
app.listen(port,serverRunning);
// Define the function that will be executed when running the server
function serverRunning(){
    console.log(`Server is running on port: ${port}`);
}
