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

const userResponseTextBox = document.getElementById('feelings');
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

    // Get the user response value from the html element and if no value set a default value
    let userResponse = "No User Response";
    if(userResponseTextBox.value!==undefined){
        userResponse = userResponseTextBox.value
    }

    // Call the asyn getAPIData function to make get fetch call to the api url 
    getAPIData(APIFullUrl)
    // chain another promise that will call the function to make post request to the app endpoint 
    .then(data=>{
        // console.log(data.main.temp)
        postEndPointData('/postData',{temperature : data.main.temp , date : newDate , userResponse : userResponse})
    })
}

// Define the asyn function getAPIData
const getAPIData = async (url)=>{
    // make fetch call to get the data from the api 
    const response = await fetch (url);
    try{
        // Convert the received data from the response to json format
        const returnedData = await response.json();
        console.log(returnedData);
        // Return the data 
        return returnedData;
    }
    // Catch the error if there and print it out
    catch(error){
        console.log('error',error);
    }
}

// Define async funcion that will use a fetch call to make post request with url and object data 
const postEndPointData = async (url= '', data = {})=>{
    // Make the post request fetch call using the url to the app endpoint and object data that will be 
    // stored in the app endpoint object which id projectData 
    const response = await fetch(url, {
        method : 'POST',
        credentials : 'same-origin',
        headers :{
            'Content-Type': 'Application/json'
        },
        body : JSON.stringify(data)
    })
    try{
        // confirm the posting of the data 
        console.log('Data Posted');
    }
    catch(error){
        console.log('error',error);
    }
}

// Define async function to fetch the data from the app endpoint
const getEndPointData = async (url = '')=>{
    const response = await fetch (url);
    try{
        const EndPointData = await response.json();
    }
    catch(error){
        console.log('error',error);
    }
}
