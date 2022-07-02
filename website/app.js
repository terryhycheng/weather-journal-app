/* Global Variables */
const coordinates = { long: 114.1, lat: 22.3 }; //Hong Kong Coordinate
const key_api = "13c8cbcd9c017b4af8799ea4c4fa9936";
const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.long}&appid=${key_api}`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
let newTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

/* Element Selection */
const submitButton = document.querySelector("#generate");
let locationInput = document.querySelector("#location_input");
let feelingsInput = document.querySelector("#feelings");
let time = document.querySelector("#time");
let date = document.querySelector("#date");
let temp = document.querySelector("#temp");
let hum = document.querySelector("#hum");
let location_box = document.querySelector("#location");
let content = document.querySelector("#content");
let noEntry = document.querySelector("#noEntry");
let entryHolder = document.querySelector("#entryHolder");

/* Helper Function */
const kelvinToCelsius = (kelvin) => {
  return kelvin - -273.15;
};

/* Main Function */
//Send inputs to API and clear input values
const submitHandler = () => {
  if (locationInput.value && feelingsInput.value) {
    noEntry.classList.add("hide");
    entryHolder.classList.remove("hide");
    location_box.innerHTML = locationInput.value;
    date.innerHTML = `Date :` + newDate;
    time.innerHTML = newTime;
    temp.innerHTML = "13";
    hum.innerHTML = "74";
    content.innerHTML = feelingsInput.value;
    locationInput.value = "";
    feelingsInput.value = "";
  }
};

/* Event Listener */
submitButton.addEventListener("click", submitHandler);
