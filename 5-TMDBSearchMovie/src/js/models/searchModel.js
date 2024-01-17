import {base_url, options} from '../config'

export default class SearchModel {
    constructor(queryString) {
        this.queryString = queryString;
    }

    async getResults() {
        const response = await fetch(`${base_url}/search/movie?query=${this.queryString}&include_adult=false&language=en-US`, options);
        console.log(`${base_url}/search/movie?query=${this.queryString}&include_adult=false&language=en-US`);
        this.data = await response.json();
    }
}