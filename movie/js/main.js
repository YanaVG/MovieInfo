const apiBaseURL = 'https://api.themoviedb.org/3/';
const $imageBaseUrl = 'http://image.tmdb.org/t/p/';
const API_KEY = '?api_key=f8167c43471dee5da36680e2976ba7af';

const $btn_white_theme = $(".white_theme");
const $btn_black_theme = $(".black_theme");
const $body = $("body");
const $navbar = $(".navbar");
const $jumbotron = $(".jumbotron");
const $row = $(".row"); //?
const $search_movie = $(".search-movie");

const $btn_save_to_LS = $("#save_to_LocalStorage");
const $added_film_to_LocalStorage = $(".added_film_to_LocalStorage");

// const nowPlayingURL = apiBaseURL + 'movie/now_playing?api_key=' + API_KEY;

$(document).ready(() => {
	$('#searchForm').on('submit', (e) => {
		e.preventDefault();
        let searchText = $('#searchText').val();
        getMovies(searchText);
		// console.log(searchText)
	});
});
  // <img src="this.$imageBaseUrl+'w185'+${movie.poster_path}">
function getMovies(searchText){
    axios.get(apiBaseURL +'search/movie' + API_KEY + '&query=' + searchText)
        .then((response) => {
        	// console.log(response)
            let movies = response.data.results;
            // let youtubeKey = movie.


// ${movie.poster_path}

            let output = '';
            $.each(movies, (index, movie) => {

            	const verifiedPicture = movies.map(item => {
            	    if(!movies.poster_path.src) {
            		    item.src = 'img/movies-film.jpg';
            	    }
            	    return item;
                });

            	output += `
                   <div class="col-md-3">
                       <div class="well text-center">
                         <img src="http://image.tmdb.org/t/p/w185+verifiedPicture">                       
                         <h5>${movie.title}</h5>
                         <a onclick ="movieSelected('${movie.id}')" href="#" class="btn btn-info">Movie Details</a>
                       </div>
                   </div>
            	`;
            })
            console.log(output);
            $('#movies').html(output);
        })
        .catch((err) => {
        	console.log(err);
        });
}
 function movieSelected(id) {
 	sessionStorage.setItem('movieId', id);
 	window.location = 'movie.html';
 	return false;
 }

// LocalStorage
 var movieArr = [];
 function handleBtnClick(e){
    e.preventDefault();
    $(this).$added_film_to_LocalStorage.innerHTML('<p class="movie_in_LocalStorage">Movie saved</p>')
    console.log("Movie added");
    var movieJSON = {"id": $(this).id, "name": $(this).movie.title};
    if(localStorage.getItem('movie') !==null){
       movieArr = localStorage.getItem('movie');
       movieArr.push(movieJSON);
       localStorage.setItem('movie', movieArr)
    }
    else{
    	movieArr.push(movieJSON);
    	localStorage.setItem('movie', movieArr);
    }
    // localStorage.setItem('movieId', id);
    // console.log(localStorage.setItem('movieId', id));
    // window.location = 'movie.html';
 }
 function getMovie() {
 	let movieId = sessionStorage.getItem('movieId');
 	 axios.get('https://api.themoviedb.org/3/movie/'+ movieId + API_KEY)
        .then((response) => {
        	console.log(response);
        	let movie = response.data;

        	const saveWithMovie = () => handleBtnClick(movieId)
        	$btn_save_to_LS.click(saveWithMovie);

        	let output = `
               <div class="row">
                 <div class="col-md-4">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="movie" class="thumbnail">
                 </div>
                  <div class="col-md-6">
                    <h2>${movie.title}</h2>
                    <ul class="list-group">
                       <li class="list-group-item"><strong>Genre: </strong> ${movie.genres[0].name}</li>
                       <li class="list-group-item"><strong>Released: </strong> ${movie.release_date}</li>
                       <li class="list-group-item"><strong>Vote Average: </strong> ${movie.vote_average}</li>
                       <li class="list-group-item"><strong>Run Time: </strong> ${movie.runtime}min</li>
                       <li class="list-group-item"><strong>Origin language: </strong> ${movie.original_language}</li>
                       <li class="list-group-item"><strong>Production Companies: </strong> ${movie.production_companies[0].name}</li>
                    </ul>
                 </div>
               </div>
                <div class="row">
                    <div class="well">
                        <h3>Plot</h3>
                        ${movie.overview}
                        <hr>
                        <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View IMDB</a>
                        <a href="index.html" class="btn btn-default">Go back to seach</a>
                        <a href="#" class="btn btn-success" id="save_to_LocalStorage">Add to favorite</a>
                        <div class="added_film_to_LocalStorage"></div>
                    </div>
               </div>

        	`;
        	$('#movie').html(output);
        })
        .catch((err) => {
        	console.log(err);
        });
 };

// change theme
$btn_black_theme.click(setCssSectionBlack);
$btn_white_theme.click(setCssSectionWhite);

function setCssSectionBlack(e) {
   $body.css('background', '#060606');
   $navbar.css('background', '#060606');
   $jumbotron.css('background', '#151515');
   $search_movie.css('color', '#fff')
                .css('fontWeight', 'bold');
   // $row.css('background', '#151515');
}

function setCssSectionWhite(e) {
   $body.css('background', '#43efed');
   $navbar.css('background', '#43efed');
   $jumbotron.css('background', '#2ac8c6');
   $search_movie.css('color', '#000')
                .css('fontWeight', 'bold');
   // $row.css('background', '#2ac8c6');
}

//save to LocalStorage

$btn_save_to_LS .click(save_to_LocalStorage);

function save_to_LocalStorage(e) {
	// console.log('save to LS');
	localStorage.setItem('movie.title', 'movie.title');
}