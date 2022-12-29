/* Global Variables */
// Base URL of open weather map
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=f61392eedf0eedd4efe3a7b9cbbeec8a&units=imperial";
const zipCode = document.getElementById("zip");
const userResponse = document.getElementById("feelings");
const generate = document.getElementById("generate");
const entry = document.querySelector(".entry");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + " / " + d.getDate() + " / " + d.getFullYear();

// Add Click Listner To Button Generate
generate.addEventListener("click", performAction);

function performAction(e) {
  e.preventDefault();

  if (zipCode.value == "") {
    alert("ZIP Code must be filled out");
    return false;
  }

  getWeatherData(baseURL, zipCode.value, apiKey).then(function (data) {
    postData("/addData", {
      temperature: data.main.temp,
      date: newDate,
      user_response: userResponse.value,
    }).then(updateUI());
  });
}

// Function to get weather data from API
const getWeatherData = async (baseURL, zipCode, apiKey) => {
  try {
    const res = await fetch(baseURL + zipCode + apiKey);
    const data = res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// Function to post weather data to projectDada object
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// Function to Update UI with weather data
const updateUI = async () => {
  const request = await fetch("/getAll");
  try {
    const allData = await request.json();
    console.log(allData);
    document.getElementById(
      "temp"
    ).innerHTML = `<span>Temperature:</span> ${Math.round(
      allData.temperature
    )} degrees`;
    document.getElementById(
      "content"
    ).innerHTML = `<span>Your Feeling:</span> ${allData.user_response}`;
    document.getElementById(
      "date"
    ).innerHTML = `<span>Date:</span> ${allData.date}`;
    entry.style.display = "block";
  } catch (error) {
    console.log("error", error);
  }
};
