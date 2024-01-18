const BAERER_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2UzZWY1MzMwN2I5NGNiZjRkYTkzZjgxMmIyMmQ2MSIsInN1YiI6IjY1ODAwNTYzZGY4NmE4MDkzN2U3OWY5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pyN0ylXVd_G9_t26iEWYm4im-IG_rpEmlqDlPYDyqYA';

const BASE_URL = 'https://api.themoviedb.org/3';

const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

const urlRated = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';



document.getElementById('ratedBtn').addEventListener('click', displayRated);

async function displayRated() {
    try {
        const response = await fetch(urlRated, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2UzZWY1MzMwN2I5NGNiZjRkYTkzZjgxMmIyMmQ2MSIsInN1YiI6IjY1ODAwNTYzZGY4NmE4MDkzN2U3OWY5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pyN0ylXVd_G9_t26iEWYm4im-IG_rpEmlqDlPYDyqYA'
            },
        });

        const data = await response.json();

        const containerRated = document.getElementById('mainContainer');
        containerRated.innerHTML = '';

        let arr = [data.results.length];


        for (let i = 0; i < 10; i++) {
            let title = data.results[i].title;
            let release_date = data.results[i].release_date;
            let poster_pat = data.results[i].poster_path;
            let card = document.createElement("div");
            card.classList.add("image-card");

            let img = document.createElement("img");
            img.classList.add('card-img-top');
            img.src = IMG_URL + poster_pat;

            let movietitle = document.createElement("h3");
            movietitle.textContent = title;

            let released = document.createElement("h6");
            released.textContent = "Released: " + release_date;

            card.append(img);
            card.append(title);
            card.append(released);
            mainContainer.append(card);

        };

    } catch (error) {
        displayError("Something went wrong. Please try again later.");
    }
}


document.getElementById('popularBtn').addEventListener('click', displayPopular);

async function displayPopular() {
    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2UzZWY1MzMwN2I5NGNiZjRkYTkzZjgxMmIyMmQ2MSIsInN1YiI6IjY1ODAwNTYzZGY4NmE4MDkzN2U3OWY5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pyN0ylXVd_G9_t26iEWYm4im-IG_rpEmlqDlPYDyqYA'
            },
        });

        const data = await response.json();

        const containerPopular = document.getElementById('mainContainer');
        containerPopular.innerHTML = '';

        let arr = [data.results.length];


        for (let i = 0; i < 10; i++) {
            let title = data.results[i].title;
            let release_date = data.results[i].release_date;
            let poster_pat = data.results[i].poster_path;
            let card = document.createElement("div");
            card.classList.add("image-card");

            let img = document.createElement("img");
            img.classList.add('card-img-top');
            img.src = IMG_URL + poster_pat;

            let movietitle = document.createElement("h3");
            movietitle.textContent = title;

            let released = document.createElement("h6");
            released.textContent = "Released: " + release_date;

            card.append(img);
            card.append(title);
            card.append(released);
            mainContainer.append(card);

        };

    } catch (error) {
        displayError("Something went wrong. Please try again later.");
    }
}



const apiKey = "53e3ef53307b94cbf4da93f812b22d61";

document.getElementById("searchForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const searchInput = document.getElementById('searchInput').value.trim();
    const searchType = document.querySelector('input[name="searchType"]:checked').value;

    if (searchInput.trim() !== "") {
        searchMovieOrPerson(searchInput, searchType);
    }
});

async function searchMovieOrPerson(query, searchType) {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/${searchType}?api_key=${apiKey}&query=${query}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2UzZWY1MzMwN2I5NGNiZjRkYTkzZjgxMmIyMmQ2MSIsInN1YiI6IjY1ODAwNTYzZGY4NmE4MDkzN2U3OWY5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pyN0ylXVd_G9_t26iEWYm4im-IG_rpEmlqDlPYDyqYA'
            },
        });
        console.log(response);
        const data = await response.json();
        console.log(data.total_results)


        if (data.total_results === 0) {
            console.error('Check your spelling and try a different search term.');
            let errorDOM = document.querySelector('#errorInstructions');
            errorDOM.innerHTML = 'Check your spelling and try a different search term.'
        }
        const searchContainer = document.getElementById('mainContainer');
        searchContainer.innerHTML = '';

        _.each(data.results, result => {
            const resultCard = document.createElement('div');
            resultCard.classList.add('image-card');

            const imageMovie = document.createElement('img');
            if (searchType === 'movie') {
                imageMovie.src = result.backdrop_path ? `https://image.tmdb.org/t/p/w780${result.backdrop_path}` : 'https://via.placeholder.com/780x440  || ' - '';
                imageMovie.classList.add('card-img-top');
                resultCard.appendChild(imageMovie);
            }

            const imageProfile = document.createElement('img');
            if (searchType === 'person') {
                imageProfile.src = result.profile_path ? `https://image.tmdb.org/t/p/w185${result.profile_path}` : 'https://via.placeholder.com/185x278  || ' - '';
                imageProfile.classList.add('card-img-top');
                resultCard.appendChild(imageProfile);
            }

            const titleName = document.createElement('h3');
            titleName.textContent = result.title || result.name;

            const releaseKnown = document.createElement('p');
            if (searchType === 'movie') {
                releaseKnown.textContent = `Release Date: ${result.release_date || '-'}`;
            } else {
                releaseKnown.textContent = `${result.known_for_department || '-'}`;
            }

            const overviewKnownFor = document.createElement('p');
            if (searchType === 'movie') {
                overviewKnownFor.textContent = `Overview: ${result.overview || '-'}`;
            }

            const knownForList = document.createElement('ul');
            if (searchType === 'person') {
                overviewKnownFor.textContent = 'Known for:';

                _.each(result.known_for, knownForItem => {
                    const listItem = document.createElement('li');
                    const mediaType = knownForItem.media_type === 'movie' ? 'Movie' : 'TV Show';
                    listItem.textContent = `${mediaType}: ${knownForItem.title || knownForItem.name}`;
                    knownForList.appendChild(listItem);
                });

            }



            resultCard.appendChild(titleName);
            resultCard.appendChild(releaseKnown);
            resultCard.appendChild(overviewKnownFor);
            resultCard.appendChild(knownForList);
            mainContainer.appendChild(resultCard);
        });
    } catch (error) {
        console.error('fel');
        displayError("Something went wrong. Please try again later.");
    }
}


function displayError(error) {

    console.log('Error occurred:', error);

    let message;
    let instructions = '';

    if (error === '400 movie' || error === '400 person') {
        message = `Can't find what you're looking for... try again.`;
        instructions = 'Check your spelling and try a different search term.';
    }
    else { message = 'Something went wrong... wait for a bit and try again.'; }

    const errorMessageContainer = document.querySelector('#errorMessageContainer');
    errorMessageContainer.classList.remove('hidden');

    const errorMessageElement = document.querySelector('#errorMessage');
    errorMessageElement.innerText = message;

    const errorInstructionsElement = document.querySelector('#errorInstructions');
    errorInstructionsElement.innerText = instructions;

}

function removePrevSearchResult() {
    const containerEl = document.querySelector('.content-container');
    containerEl.classList.remove('hidden');

    const errorContainer = document.querySelector('#errorMessageContainer');
    errorContainer.classList.add('hidden');
}

