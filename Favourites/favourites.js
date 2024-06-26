//event listener added to the document that runs when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
	const favouritesList = document.getElementById("favourites-list");
	// Retrieve the list of favorite movie IDs from localStorage or initialize it to an empty array
	let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

	// Function to fetch movie details from the OMDB API using the movie ID
	async function fetchMovie(id) {
		const url = `http://www.omdbapi.com/?apikey=ac499f09&i=${id}`;
		try {
			const res = await fetch(url);
			if (!res.ok) {
				throw new Error(`Error fetching movie with ID ${id}`);
			}
			return await res.json();
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	// Function to load and display the favorite movies
	async function loadFavouriteMovies() {
		favouritesList.innerHTML = "";
		const fragment = document.createDocumentFragment();
		for (let id of favourites) {
			const movie = await fetchMovie(id);
			// If movie details are successfully fetched,a movie element is created and appended 
			if (movie) {
				const movieElement = document.createElement("div");
				movieElement.className = "movie card mb-4";
				movieElement.innerHTML = `
                    <a href="../Movie/movie.html?id=${movie.imdbID}">
                        <img src="${movie.Poster}" class="poster card-img-top" alt="No Poster Available">
                    </a>
                    <div class="movieDetails card-body">
                        <div>
                            <h2 class="card-title">${movie.Title}</h2>
                            <button class="remove-fav-btn btn btn-danger" data-id="${movie.imdbID}">Remove</button>
                        </div>  
                    </div>
                `;
				fragment.appendChild(movieElement);
			}
		}
		// Append the fragment with all movie elements to the favourites list
		favouritesList.appendChild(fragment);
	}

	//event listener to the favourites list to handle remove button clicks
	favouritesList.addEventListener("click", (event) => {
		if (event.target.className.includes("remove-fav-btn")) {
			const movieId = event.target.dataset.id;
			favourites = favourites.filter((id) => id !== movieId);
			localStorage.setItem("favourites", JSON.stringify(favourites));
			loadFavouriteMovies();
		}
	});

	// Initial call to load and display the favorite movies when the page loads
	loadFavouriteMovies();
});
