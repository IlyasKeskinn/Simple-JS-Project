// UI class to handle UI elements and interactions
class UI {
    constructor() {
        // DOM elements
        this.fromLangSelect = document.getElementById("from-lang");
        this.toLangSelect = document.getElementById("to-lang");
        this.fromText = document.getElementById("from-text");
        this.toText = document.getElementById("to-text");
        this.translateBtn = document.getElementById("translateBtn");
        this.exchangeLanguage = document.getElementById("exchangeLanguage");
        this.icons = document.querySelectorAll(".icons");
    }

    // Display translated text in the 'to' textarea
    showTranslate(resultTranslate) {
        this.toText.value = resultTranslate;
    }

}