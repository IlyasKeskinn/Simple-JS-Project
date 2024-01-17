import Search from './models/searchModel';
import Details from './models/movieDetailsModel';
import { elements } from './base';
import * as searchView from './view/SearchView';
import * as detailsView from './view/movieDetailsView';



const state = {}


const searchController = async () => {

    const query = elements.searchTxt.value;

    if (query) {
        searchView.clearSearchInput();
        searchView.clearResults();
        state.search = new Search(query);

        await state.search.getResults();


        searchView.displaySearchMovie(state.search.data);

    }
    else {
        alert("bos birakma")
    }

}
const movieDetailsController = async () => {

    const id = window.location.hash.replace("#", '');

    if (id !== null) {
        state.details = new Details(id);

        await state.details.getMovies();

        detailsView.displayDetails(state.details.data);
        detailsView.backToTop();
    }
    else {
        console.log("empty");
    }
}

elements.searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    searchController();
})

window.addEventListener("hashchange", movieDetailsController);

elements.closeDetails.addEventListener("click", detailsView.hideDetailCard);

