// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Express to run server and routes
// Port Number
const port = 8000;

// Run Server
app.listen(port, listening);

function listening() {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}

// Initialize the main project folder
app.use(express.static("website"));

// GET Route I
app.get("/getData", getData);

// Get Data Function
function getData(req, res) {
  res.send(projectData);
}

// GET Route II
app.get("/getAll", getAllData);

// Get All Data Function
function getAllData(req, res) {
  res.send(projectData);
}

// POST Route
app.post("/addData", addData);

// Add Data Function
function addData(req, res) {
  newEntry = {
    temperature: req.body.temperature,
    date: req.body.date,
    user_response: req.body.user_response,
  };
  Object.assign(projectData, newEntry);
  res.send(projectData);
}
