//ChatGPT har använts för att sätta upp API:et då jag inte visste var
// jag kunde hitta olika queries på TMDB hemsidan.

const BASE_URL = 'https://api.themoviedb.org/3/';


const API_KEY = 'api_key=11b6cf96709a5d4b2f10a815f72a3569';


const API_URL = `${BASE_URL}movie/top_rated?language=en-US&${API_KEY}`;


const IMG_URL = 'https://image.tmdb.org/t/p/w500/';



const SEARCH_URL = BASE_URL + 'search/movie?' + API_KEY;

const main = document.getElementById('main');


const form = document.getElementById('form');
const search = document.getElementById('search')





getMovies(API_URL);


function getMovies(url){

    
    fetch(url)
    .then(res => res.json())
    .then(data => showMovies(data.results.slice(0, 10)))
    .catch(err => console.error('Could not fetch movies:', err));
    
}


function showMovies(movies) {
    //ChatGPT har använts här då jag inte visste hur jag identifiera brist på
    //sökresultat
    if (movies.length === 0) {
        main.innerHTML = `<div class="noResults">
            <h2>No movies were found. <br> Please try using a different search term.</h2>
        </div>`;
        return;
    }



    main.innerHTML = '';
    movies.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = 
        
        //ChatGPT har använts här i samband med fallback imagen
        `<img src="${poster_path ? IMG_URL + poster_path : 'images/cinema.jpg'}" alt="${title}">
        <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
        <h3>Overview</h3>
        ${overview}
        </div>`;
        
        
        main.appendChild(movieElement);

    });

    //ChatGPT har använts för Tilt.js pga upprepande error-koder.
    VanillaTilt.init(document.querySelectorAll('.movie'), {
        max: 15,           
        speed: 300,        
        // glare: true,
        // "max-glare": 0.3,  

    });
}


    

        function getColor(vote){
            if(vote >= 8){
                return 'green'
            }
            else if(vote >= 5)
                return 'orange'
            else{
                return 'red'
            }
        }



form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm){
        getMovies(SEARCH_URL + '&query=' + searchTerm);
    }

})