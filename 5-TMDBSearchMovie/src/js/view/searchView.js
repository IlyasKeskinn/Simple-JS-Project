import { elements } from "../base";

export const displaySearchMovie = data => {


    data.results.forEach(movie => {
        const movieLi = `    
                <li>
                    <a href="#${movie.id}">
                        </div>
                        <div class="card mb-3">
                            <div class="row g-0">
                                <div class="col-md-2">
                                    <div style = "width: 185px; height:247px;">
                                    <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}"  style = "height:100%; width:100%;" alt="${movie.poster_path}"
                                        class=" rounded-start" onerror=this.src='https://via.placeholder.com/185x247'>
                                    </div>
                                </div>
                                <div class=" col-md-10">
                                    <div class="card-body">
                                        <h5 class="card-title">
                                            ${movie.title}
                                        </h5>
                                        <p class="card-text">
                                            ${movie.overview}
                                        </p>
                                        <span class="badge bg-primary">${Math.floor(movie.vote_average)}/<smal>10</smal></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </li>
        `
        elements.searchResult.insertAdjacentHTML("beforeend", movieLi);
    });
}

export const clearSearchInput = () => {
    elements.searchTxt.value = '';
}

export const clearResults = () => {
    elements.searchResult.innerHTML = '';
}