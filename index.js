// OMDB API - http://www.omdbapi.com/?i=tt3896198&apikey=ac499f09
// API key - ac499f09

const searchBar = document.getElementById("search-bar");
const result = document.getElementById("results");

// to load movies from API
async function handleSearchBarInput() {
	const movieName = searchBar.value.trim();
	const url = `http://www.omdbapi.com/?apikey=ac499f09&s=${movieName}`;
	const res = await fetch(`${url}`);
	const data = await res.json();
	console.log("Data from API:", data);
	if (data.Response == "True") {
		displayMovies(data);
	} else {
		result.innerHTML = "";
	}
}

// eventListeners to search the input from Search Bar
searchBar.addEventListener("input", handleSearchBarInput);

// to display movies results after the API call
function displayMovies(movies) {
	result.innerHTML = "";
	movies.Search.forEach((movie) => {
		const isFavourite = favourites.includes(movie.imdbID) ? "red" : "";
		result.innerHTML += `
        <div class="movie card mb-4">
            <a href="Movie/movie.html?id=${movie.imdbID}">
                <img src="${movie.Poster}" class="poster card-img-top" alt="No Poster Available">
            </a>
            <div class="movieDetails card-body">
            <div><h2 class="card-title">${movie.Title}
            <i class="far fa-heart heart-icon ${isFavourite}" id=${movie.imdbID}></i>
            </h2>
            </div>  
                <h3 class="card-subtitle mb-2 text-muted">${movie.Year}</h3>
            </div>
        </div>
    `;
	});
}

// handle favourites with local storage
let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
function saveFavourites() {
	localStorage.setItem("favourites", JSON.stringify(favourites));
}

// event listener for favourites
result.addEventListener("click", addToFav);

// function to add or remove the movie from favourites
function addToFav(event) {
	// Check if the clicked element is a heart icon
	if (event.target.className.includes("heart-icon")) {
		const movieId = event.target.id;
		if (event.target.className.includes("red")) {
			favourites = favourites.filter((id) => id !== movieId);
		} else {
			favourites.push(movieId);
		}
		event.target.classList.toggle("red");
		saveFavourites();
	}
}
