// API key and base URL for Exchange Rate API
const API_KEY = "<apikey>";
const url = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

const ui = new UI();

// Event listener when the page loads to get currency codes
window.addEventListener("load", () => {
    getCurrencyCode();

})

// Event listener for the exchange button
ui.exchangeBtn.addEventListener("click", () => {
    calculateExhange();
})

// Fetches currency codes from the Exchange Rate API
async function getCurrencyCode() {
    const response = await fetch(url + "/codes");
    if (!response.ok)
        throw new Error("Could not retrieve data from the service");
    const data = await response.json();
    const codes = data.supported_codes;
    ui.showCurrencyCodes(codes);
}

// Calculates the exchange rate and displays the result
async function calculateExhange() {
    const currencyOne = ui.currencyOne.value.toUpperCase();
    const currencyTwo = ui.currencyTwo.value.toUpperCase();
    const amount = ui.amount.value

    let latestUrl = `${url}/latest/${currencyOne}`;
    const response = await fetch(latestUrl);
    const data = await response.json();
    const exchangeRate = data.conversion_rates[currencyTwo];

    const result = Math.floor(amount * exchangeRate).toFixed(1);

    const resultTag = `
        <h5 class ="lead">${amount} ${currencyOne} = ${result} ${currencyTwo} </h5>
    `
    ui.result.innerHTML = resultTag;
}

