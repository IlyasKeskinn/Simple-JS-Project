import { elements } from "../base";

export const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

}

export const displayDetails = (movie) => {
    elements.detailsContainer.classList.remove("d-none");

    let movieDetailsCardBody = `
            
                <div class="row">
                    <div class="col-md-4">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" onerror=this.src='https://via.placeholder.com/185x247' alt="${movie.poster_path}" class="img-fluid">
                    </div>
                    <div class="col-md-8">
                        <h4 class="card-title">
                            ${movie.title}
                        </h4>
                        <p class="card-text">
                            ${movie.overview}
                        </p>
                        <span class="badge bg-warning">${Math.floor(movie.vote_average)}</span>
                        <hr>
                        <span class="badge bg-warning">Aile</span>
                    </div>
                </div>
    
    `
    elements.detailsContainer.classList.add("d-block");

    elements.movieDetailsCard.innerHTML = movieDetailsCardBody;

}

export const hideDetailCard = () => {
    elements.detailsContainer.classList.remove("d-block");
    elements.detailsContainer.classList.add("d-none");

}