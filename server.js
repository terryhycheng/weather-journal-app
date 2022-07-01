// Setup empty JS object to act as endpoint for all routes
const projectData = { id: 1, values: "Hello World!" };
const port = 8000;

// Require Express to run server and routes
const express = require("express");
const app = express();

// Start up an instance of app
const cors = require("cors");
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const server = app.listen(port, () => {
  console.log(`running on loacalhost:${port}`);
});

/* RESTFUL API */

//GET ROUTE
app.get("/api", (req, res) => {
  res.send(projectData);
  console.log(projectData);
});

//POST ROUTE
