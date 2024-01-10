// The UI class contains methods for manipulating the user interface
class UI {
    constructor() {
        this.countrySearchBtn = document.getElementById("countrySearchBtn");
        this.countryTxt = document.getElementById("countryTxt");
        this.country_result = document.getElementById("country_result");
        this.counrty_info = document.getElementById("counrty_info");
        this.neighbours = document.getElementById("neighboursCountry");
        this.neighboursList = document.getElementById("neighboursCountryList");
        this.details = document.querySelector(".details");
        this.errorDiv = document.querySelector(".errorMsg");
        this.locationBtn = document.getElementById("locationBtn");
    }


    // Method for displaying country details in the UI
    displayCountry(data) {
        let result = `
                        <div class="col-md-4">
                            <img src="${data.flags.png}" class="img-fluid">
                        </div>
                        <div class="col-md-8">
                            <h3 class="lead">${data.name.common}</h3>
                            <hr>
                            <div class="row">
                                <div class="col-md-3">Capital: </div>
                                <div class="col-md-9">${data.capital}</div>
                            </div>
                            <div class="row">
                                <div class="col-md-3">Language: </div>
                                <div class="col-md-9">${Object.values(data.languages)}</div>
                            </div>
                            <div class="row">
                                <div class="col-md-3">Population: </div>
                                <div class="col-md-9">  ${(data.population / 1000000).toFixed(1)}</div>
                            </div>
                            <div class="row">
                                <div class="col-md-3">Currency: </div>
                                <div class="col-md-9">${Object.values(data.currencies)[0].name} (${(Object.values(data.currencies)[0]).symbol})</div>
                            </div>
                        </div>
    `   // Set the HTML content and make the details section visible
        ui.details.style.opacity = 1;
        ui.counrty_info.innerHTML = result;

    }

    // Method for displaying neighboring countries in the UI
    displayNeighbours(data) {
        let card = ""
        for (let country of data) {
            card += `
            <div class="col-md-2 p-2" onclick="selectedCountry(this)">
                <div class="card neighbourCountryCard">
                    <img src="${country.flags.png}" alt="" class="card-img-top ">
                    <div class="card-body">
                        <h5 class="lead">${country.name.common}</h5>
                    </div>
                </div>
            </div>
    `;
        }
        // Set the HTML content and make the details section visible
        ui.details.style.opacity = 1;
        ui.neighboursList.innerHTML = card;

    }
    // Method for displaying error messages in the UI
    displayMessage(error) {
        let errorAlert = `
            <div class="alert alert-warning">${error.message}</div>

        `

        // Set the HTML content and clear the error message after 3 seconds
        this.errorDiv.innerHTML = errorAlert;

        setTimeout(() => {
            this.errorDiv.innerHTML = '';

        }, 3000);
    }
}

