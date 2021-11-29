import "./component/search-bar";
import "./component/modal-detail";

const main = () => {
	const movieContainer = document.querySelector(".movie-container");
	const searchButton = document.querySelector(".btn-search");
	const keyword = document.querySelector(".input-keyword");
	const title = document.querySelector(".title");
	const modalBody = document.querySelector(".modal-body");

	fetch(
		`https://api.themoviedb.org/3/movie/popular?api_key=cda5e6184f2f4368e0cb688a4e08fb55`
	)
		.then((response) => response.json())
		.then((response) => {
			showContent(response);
			title.innerHTML = `<h2 class="text-center my-2">Popular Movie</h2>`;
			detail();
			searchButton.addEventListener("click", () => {
				searchMovie();
			});
		});

	const searchMovie = () => {
		if (`${keyword.value}` == "") {
			alert("please input keyword");
		} else {
			fetch(
				`https://api.themoviedb.org/3/search/movie?api_key=cda5e6184f2f4368e0cb688a4e08fb55&query=${keyword.value}`
			)
				.then((response) => response.json())
				.then((response) => {
					if (response.results == 0) {
						throw new Error(response.statusText);
					}
					showContent(response);
					title.innerHTML = `<h2 class="text-center my-2">Search Result : ${keyword.value}</h2>`;

					detail();
				})
				.catch(() => {
					ShowError(`${keyword.value}`);
				});
		}
	};
	const detail = () => {
		const detailButton = document.querySelectorAll(".btn-movie-details");
		detailButton.forEach((btn) => {
			btn.addEventListener("click", (e) => {
				const imbid = e.target.dataset.id;
				fetch(`
						https://api.themoviedb.org/3/movie/${imbid}?api_key=cda5e6184f2f4368e0cb688a4e08fb55`)
					.then((response) => response.json())
					.then((movie) => {
						let homepage =
							`${movie.homepage}` != "" ? `${movie.homepage}` : "Not Found";
						let backrdrop =
							`${movie.backdrop_path}` == "null"
								? `https://source.unsplash.com/1000x700/?${movie.title}`
								: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
						modalBody.innerHTML = detailContent(movie, homepage, backrdrop);
					});
			});
		});
	};

	const showContent = (response) => {
		const movies = response.results;
		let cards = "";
		movies.forEach((movie) => {
			let poster =
				`${movie.poster_path}` == "null"
					? `https://source.unsplash.com/500x700/?${movie.title}`
					: `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
			cards += movieContent(movie, poster);
		});
		movieContainer.innerHTML = cards;
	};

	const movieContent = (movie, poster) => {
		return `<div class="col-md-3 my-4">
						<div class="card">
							<img src=${poster} class="card-img-top" alt="Poster Not Found"/>
							<div class="card-body text-center">
								<h5 class="card-title fw-bold">${movie.title}</h5>
								<h6 class="card-subtitle mb-4 text-muted ">Rating : ${movie.vote_average}</h6>
								<a href="#" class="btn btn-movie-details px-4" data-bs-toggle="modal" data-bs-target="#detailMovie"
								data-id="${movie.id}">Show Details</a>
							</div>
						</div>
					</div>`;
	};

	const detailContent = (movie, homepage, backrdrop) => {
		return `<div class="container-fluid">
						<div class="row mb-4">
							<div class="col-md">
								<img
									src=${backrdrop}
									alt="Not Found"
									class="img-fluid"
								/>
							</div>
						</div>
						<div class="row">
							<div class="col-md">
								<ul class="list-group">
									<li class="list-group-item text-center">
										<h3>${movie.original_title}</h3>
										<h5 class="text-muted text-center">${movie.tagline}</h5>
									</li>
									<li class="list-group-item">Release Date : ${movie.release_date}</li>
									<li class="list-group-item">Overview : ${movie.overview}</li>
									<li class="list-group-item">Rate : ${movie.vote_average}</li>
									<li class="list-group-item">More detail : 
									<a href="${movie.homepage}" target="_blank">${homepage}</a></li>
								</ul>
							</div>
						</div>
					</div>`;
	};

	const ShowError = (keyword) => {
		title.innerHTML = `<h2 class="text-center my-2">Search Result : ${keyword} is not found</h2>`;
		movieContainer.innerHTML = "";
	};
};

export default main;
