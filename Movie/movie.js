document.addEventListener("DOMContentLoaded", () => {
	const urlParams = new URLSearchParams(window.location.search);
	const movieId = urlParams.get("id");

	if (movieId) {
		fetchMovieDetails(movieId);
	}

    // api call to get specific movie details with ID
	function fetchMovieDetails(id) {
		const url = `http://www.omdbapi.com/?apikey=ac499f09&i=${id}`;
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				displayMovieDetails(data);
			})
			.catch((error) => {
				console.error("Error fetching movie details:", error);
			});
	}

    // to render movie details with all the info
	function displayMovieDetails(movie) {
		const movieDetailsContainer = document.getElementById("movie-details");
		movieDetailsContainer.innerHTML = `
            <div class="col-md-4">
                <img src="${movie.Poster}" class="img-fluid" alt="No Poster Available">
            </div>
            <div class="col-md-8"> 
                    <h2>${movie.Title}</h2>
                <p><strong>Year:</strong> ${movie.Year}</p>
                <p><strong>Rated:</strong> ${movie.Rated}</p>
                <p><strong>Released:</strong> ${movie.Released}</p>
                <p><strong>Runtime:</strong> ${movie.Runtime}</p>
                <p><strong>Genre:</strong> ${movie.Genre}</p>
                <p><strong>Director:</strong> ${movie.Director}</p>
                <p><strong>Writer:</strong> ${movie.Writer}</p>
                <p><strong>Actors:</strong> ${movie.Actors}</p>
                <p><strong>Plot:</strong> ${movie.Plot}</p>
                <p><strong>Language:</strong> ${movie.Language}</p>
                <p><strong>Country:</strong> ${movie.Country}</p>
                <p><strong>Awards:</strong> ${movie.Awards}</p>
                <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
                <p><strong>IMDb Votes:</strong> ${movie.imdbVotes}</p>
                <p><strong>BoxOffice:</strong> ${movie.BoxOffice}</p>
            </div>
        `;
	}
});
