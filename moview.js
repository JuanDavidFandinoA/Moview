let page = 1;
const backbutton = document.getElementById("backbutton");
const nextbutton = document.getElementById("nextbutton");

nextbutton.addEventListener("click", () => {
	if(page < 1000){
		page += 1;
		loadmovies();
	}
});

backbutton.addEventListener("click", () => {
	if(page > 1){
		page -= 1;
		loadmovies();
	}
});

const loadmovies = async() => {
	try {
		const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${page}`);
		console.log(response);
		if(response.status === 200){
			const data = await response.json();
			let movies = '';
			data.results.forEach(movie => {
				movies += `
					<div class="movie">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
						<h3 class="title">${movie.title}</h3>
					</div>
				`;
			});

			document.getElementById("container").innerHTML = movies;
		} else if(response.status === 401){
			console.log("Mal posicionamiento de la llave");
		} else if(response.status === 404){
			console.log("No se han encontrado resultados de la pelicula solicitada. Intenta nuevamente y verifica ortografia.");
		} else {
			console.log("Error desconocido");
		}
	} catch(error){
		console.log(error);
	}

}

loadmovies();