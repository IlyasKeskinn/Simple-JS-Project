// UI class handles user interface interactions
class UI {
    constructor() {
        this.currencyOne = document.getElementById("currencyOne");
        this.curencyOneList = document.getElementById("currencyOneList");
        this.currencyTwo = document.getElementById("currencyTwo");
        this.curencyTwoList = document.getElementById("currencyTwoList");
        this.amount = document.getElementById("amountMoney");
        this.exchangeBtn = document.getElementById("exchangeBtn");
        this.result = document.getElementById("result");
    }

    // Displays currency codes in the input dropdown lists
    showCurrencyCodes(codes) {


        let option = ' ';
        for (let i = 0; i < codes.length; i++) {
            let currencyCode = codes[i][0];
            let countryName = codes[i][1];
            option += `
                <option value="${currencyCode}">${currencyCode} - ${countryName}</option>
            `
        }
        this.curencyOneList.innerHTML = option;
        this.curencyTwoList.innerHTML = option;
    }
}

