// Setup empty JS object to act as endpoint for all routes
let projectData = { temp: "32", hum: "84", brief: "Sunny" };
const port = 8000;

//Global Variables
let api_url = "";

//Helper Function
const updatedURL = (data, api) => {
  api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.long}&appid=${api}`;
  return api_url;
};

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
  try {
    res.status(200).send(projectData);
  } catch (error) {
    console.log("error from GET request:", error);
  }
});

//POST ROUTE
app.post("/api", (req, res) => {
  try {
    coordinates = req.body;
    updatedURL(coordinates, req.body.apiKey);
    projectData = { ...projectData, url: api_url };
    res.send(projectData.url);
  } catch (error) {
    console.log("error from POST request:", error);
  }
});
