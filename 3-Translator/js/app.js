// Create an instance of the UI class
const ui = new UI();

// Event listener when the window loads
window.addEventListener("load", () => {
    // Populate language dropdowns with options from 'languages' object
    for (let key in languages) {
        let value = key;
        let name = languages[key];
        let options = `<option value="${value}">${name}</option>`;
        ui.fromLangSelect.insertAdjacentHTML("beforeend", options);
        ui.toLangSelect.insertAdjacentHTML("beforeend", options);
    }
    // Set default language selections
    ui.fromLangSelect.value = "tr-TR";
    ui.toLangSelect.value = "en-GB";

})

// Event listener for the translate button
ui.translateBtn.addEventListener("click", async () => {
    // Get text to be translated
    const text = ui.fromText.value;
    // Call the translation function and display the result
    const data = await translateText(text);
    ui.showTranslate(data);

});

// Event listener for the exchange language button
ui.exchangeLanguage.addEventListener("click", () => {
    // Swap selected 'from' and 'to' languages
    let oldFromLang = ui.fromLangSelect.value;
    let oldToLang = ui.toLangSelect.value;
    ui.fromLangSelect.value = oldToLang;
    ui.toLangSelect.value = oldFromLang;

    // Swap input and output text values
    let oldFromText = ui.fromText.value;
    let oldToLangText = ui.toText.value;
    ui.fromText.value = oldToLangText;
    ui.toText.value = oldFromText;
})

// Function to fetch translation using MyMemory API
async function translateText(text) {
    const fromLang = ui.fromLangSelect.value.slice(0, 2);
    const toLang = ui.toLangSelect.value.slice(0, 2);

    const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${fromLang}|${toLang}`;
    const response = await fetch(url);
    const data = await response.json();

    const resultTranslate = data.responseData.translatedText;

    return resultTranslate;
}

// Speech synthesis functionality
const synth = window.speechSynthesis;

// Event listeners for copy and volume icons
for (let icon of ui.icons) {
    icon.addEventListener("click", (e) => {
        if (e.target.parentElement.classList.contains("copy-icon")) {
            // Copy text to clipboard based on the selected language
            if (e.target.parentElement.getAttribute("data-id") == "from") {
                navigator.clipboard.writeText(ui.fromText.value);
            } else {
                navigator.clipboard.writeText(ui.toText.value);
            }
        }
        if (e.target.parentElement.classList.contains("volume-icon")) {
            // Speak the selected text using text-to-speech
            let utterThis;
            if (e.target.parentElement.getAttribute("data-id") == "from") {
                utterThis = new SpeechSynthesisUtterance(ui.fromText.value);
                utterThis.lang = ui.fromLangSelect.value;
            } else {
                utterThis = new SpeechSynthesisUtterance(ui.toText.value);
                utterThis.lang = ui.toLangSelect.value;
            }
            synth.speak(utterThis);
        }
    })
}
