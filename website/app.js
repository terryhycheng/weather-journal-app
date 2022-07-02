/* --- Global Variables --- */
const apiKey = "13c8cbcd9c017b4af8799ea4c4fa9936&units=metric";
//Array of Location Options
const location_options = [
  { city: "Hong Kong", long: 114.1, lat: 22.3 },
  { city: "New York City", long: -73.9, lat: 40.7 },
  { city: "London", long: -0.14, lat: 51.5 },
  { city: "Toronto", long: -79.4, lat: 43.7 },
];

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
let newTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

/* --- Element Selection --- */
const submitButton = document.querySelector("#generate");
let locationInput = document.querySelector("#location_input");
let feelingsInput = document.querySelector("#feelings");
let time = document.querySelector("#time");
let date = document.querySelector("#date");
let temp = document.querySelector("#temp");
let hum = document.querySelector("#hum");
let brief = document.querySelector("#brief");
let location_box = document.querySelector("#location");
let content = document.querySelector("#content");
let noEntry = document.querySelector("#noEntry");
let entryHolder = document.querySelector("#entryHolder");

/* --- Helper Function --- */

//Generate options with coorisponding values from an array
const createLocationOption = (city) => {
  let option = document.createElement("option");
  option.setAttribute("value", city);
  option.innerText = city;
  return option;
};

//Adding options into select tag
const addingOptions = () => {
  for (let option of location_options) {
    locationInput.append(createLocationOption(option.city));
  }
};

//Check which city is selected and return its geographical data
const checkLocation = (location) => {
  for (let num in location_options) {
    if (location === location_options[num].city) {
      return location_options[num];
    }
  }
};

/* --- Main Function --- */

//To handle submission
const submitHandler = async () => {
  //check if the inputs are empty
  if (locationInput.value && feelingsInput.value) {
    try {
      //POST request with API key and data of selected city
      const post_res = await fetch("http://127.0.0.1:8000/api", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...checkLocation(locationInput.value), apiKey }),
      });
      const weatherAPI_URL = await post_res.text();
      //GET request: Fetch Weather Data from OpenWeather
      const API_res = await fetch(weatherAPI_URL);
      const API_data = await API_res.json();
      //Hide no entry div and show the entry holder div
      noEntry.classList.add("hide");
      entryHolder.classList.remove("hide");
      //Update UI
      location_box.innerHTML = locationInput.value;
      date.innerHTML = d.toDateString();
      time.innerHTML = newTime;
      temp.innerHTML = API_data.main.temp;
      hum.innerHTML = API_data.main.humidity;
      brief.innerHTML = API_data.weather[0].main;
      content.innerHTML = feelingsInput.value;
      //Clear Input Values
      locationInput.value = "";
      feelingsInput.value = "";
    } catch (error) {
      console.log("Error:", error);
    }
  }
};

/* --- Event Listener --- */
//Submit Handler
submitButton.addEventListener("click", submitHandler);

//adding options to select input
addingOptions();
