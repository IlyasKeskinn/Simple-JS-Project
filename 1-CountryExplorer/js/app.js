// Create an instance of the UI class
const ui = new UI();

window.addEventListener("load", getLocationInformation());

// Event listener for the country search button
ui.countrySearchBtn.addEventListener("click", () => {
    let searchingCountry = ui.countryTxt.value;
    ui.countryTxt.value = "";
    getCountrry(searchingCountry);
})

// Function for making API requests to get country details and neighbors
async function getCountrry(countryName) {
    try {
        // Clear existing content in UI elements
        ui.neighboursList.innerHTML = '';
        ui.counrty_info.innerHTML = '';

        // Make a request to get country details
        const response = await fetch("https://restcountries.com/v3.1/name/" + countryName);
        if (!response.ok)
            throw new Error("No such country found")
        const data = await response.json();
        ui.displayCountry(data[0]);

        // Get neighboring countries and make a request to get their details
        let countries = data[0].borders;
        if (!countries) {
            throw new Error("Neighboring Country Not Found")
        } else {
            const responseNeighbour = await fetch("https://restcountries.com/v3.1/alpha?codes=" + countries);
            const dataNeighbour = await responseNeighbour.json();

            ui.displayNeighbours(dataNeighbour);
        }


    } catch (error) {
        // Display error messages in the UI
        ui.displayMessage(error);
    }
}

// Event listener for clicking on a neighboring country card
const selectedCountry = (counrty) => {
    let selectCountry = counrty.querySelector("h5").innerText;
    getCountrry(selectCountry);
}

// Event listener for the location button
ui.locationBtn.addEventListener("click", getLocationInformation())

function getLocationInformation() {

    let latitude = "";
    let longitude = "";

    // Check if geolocation is supported by the browser
    if (navigator.geolocation) {
        // Get current position and call success or error functions
        navigator.geolocation.getCurrentPosition(success, error);
    }
    // Success callback function when geolocation is successful
    async function success(location) {
        latitude = location.coords.latitude;
        longitude = location.coords.longitude;

        const API_KEY = "API_KEY";
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}&language=en`;

        // Make a request to get the country name based on location coordinates
        const response = await fetch(url);
        const data = await response.json();
        let country_name = data.results[0].components.country;

        // Set the obtained country name and trigger a click on the search button
        ui.countryTxt.value = country_name;
        ui.countrySearchBtn.click();
    }

    // Error callback function when geolocation is not supported or fails
    function error() {
        return "Geolocation is not supported by your browser";
    }
}
