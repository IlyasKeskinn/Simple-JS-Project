import { base_url, options } from "../config";


export default class MovieDetails {
    constructor(id) {
        this.id = id;
    }


    async getMovies() {
        const response = await fetch(`${base_url}/movie/${this.id}?language=en-US`,options);
        this.data = await response.json();
    }
}