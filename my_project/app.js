// const fullUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${personalAPIKey}&units=metric`;
// const fullUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${personalAPIKey}`;

/* Global Variables */
// Define variable for baseURL of the webAPI
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
// Define variable for API key
const personalAPIKey = "&appid=e54731bc5eadb2080db2679daaabc6bf";
//Define variable to get the element that will have the value of zip code
const zipTextBox = document.getElementById("zip");
// Define variable to get the button element to create event listener on it
const button = document.getElementById("generate");
// Define three variables to get the html elements that will hold the UI updated data
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const content = document.getElementById("content");

const userResponseTextBox = document.getElementById("feelings");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// Add event listener for the button element when clicked to perform some actions
button.addEventListener("click", performActions);

// Define the callback function for the button event listener
function performActions(e) {
  // Get the value of the zip code from the zipTextBox element value
  const zipCode = zipTextBox.value;
  // Make the full URL for the API using three variables
  APIFullUrl = baseURL + zipCode + personalAPIKey;
  // console.log(APIFullUrl);

  // Get the user response value from the html element and if no value set a default value
  let userResponse = "No User Response";
  if (userResponseTextBox.value !== undefined) {
    userResponse = userResponseTextBox.value;
  }

  // Call the asyn getAPIData function to make get fetch call to the api url
  getAPIData(APIFullUrl)
    // chain another promise that will call the function to make post request to the app endpoint
    .then((data) => {
      // console.log(data.main.temp)
      postEndPointData(
        "https://weather-journal-app-server-uc5k.onrender.com/postData",
        {
          temperature: data.main.temp,
          date: newDate,
          userResponse: userResponse,
        }
      );
    })
    // Chain another promise to get the data from app endpoint
    .then(() => {
      getEndPointData(
        "https://weather-journal-app-server-uc5k.onrender.com/all"
      );
      // Chain another promise to update the UI after finishing the get request to the app endpoint using
      // the data returned from the previous promise
    })
    .then((data) => {
      updateUI(data);
    });
}

// Define the asyn function getAPIData
const getAPIData = async (url) => {
  // make fetch call to get the data from the api
  const response = await fetch(url);
  try {
    // Convert the received data from the response to json format
    const returnedData = await response.json();
    console.log(returnedData);
    // Return the data
    return returnedData;
  } catch (error) {
    // Catch the error if there and print it out
    console.log("error", error);
  }
};

// Define async funcion that will use a fetch call to make post request with url and object data
const postEndPointData = async (url = "", data = {}) => {
  // Make the post request fetch call using the url to the app endpoint and object data that will be
  // stored in the app endpoint object which id projectData
  try {
    const response = await fetch(url, {
      method: "POST",
      //   credentials: "cross-origin",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(data),
    });
    // confirm the posting of the data
    console.log("Data Posted");
  } catch (error) {
    console.log("error", error);
  }
};

// Define async function to fetch the data from the app endpoint
const getEndPointData = async (url = "") => {
  const response = await fetch(url);
  try {
    const endPointData = await response.json();
    console.log(endPointData);
    return endPointData;
  } catch (error) {
    console.log("error", error);
  }
};

// Define function that will update the UI data using the data returned from the app endpoint
function updateUI(data) {
  // Set the innerHTML property for the divs in entry holder to the values of data returned from the app endpoint
  date.innerHTML = `<p>Date : ${data.date}</p>`;
  temp.innerHTML = `<p>Temperature : ${data.temperature} C</p>`;
  content.innerHTML = `<p>User Response : ${data.userResponse}</p>`;
}
