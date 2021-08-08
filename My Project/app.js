// const fullUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${personalAPIKey}&units=metric`;

/* Global Variables */
// Define variable for baseURL of the webAPI
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
// Define variable for API key
const personalAPIKey = "&appid=e54731bc5eadb2080db2679daaabc6bf";
//Define variable to get the element that will have the value of zip code
const zipTextBox = document.getElementById('zip');
// Define variable to get the button element to create event listener on it 
const button = document.getElementById('generate');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Add event listener for the button element when clicked to perform some actions
button.addEventListener('click',performActions);

// Define the callback function for the button event listener
function performActions(e){

    // Get the value of the zip code from the zipTextBox element value
    const zipCode = zipTextBox.value;
    // Make the full URL for the API using three variables
    APIFullUrl = baseURL+zipCode+personalAPIKey+'&units=metric';
    // console.log(APIFullUrl);
    // Call the asyn getAPIData function to make get fetch call to the api url 
    getAPIData(APIFullUrl);
}

// Define the asyn function getAPIData
const getAPIData = async (url)=>{
    // make fetch call to get the data from the api 
    const response = await fetch (url);
    try{
        // Convert the received data from the response to json format
        const returnedData = await response.json();
        // console.log(returnedData);
        // Return the data 
        return returnedData;
    }
    // Catch the error if there and print it out
    catch(error){
        console.log('error',error);
    }
}

