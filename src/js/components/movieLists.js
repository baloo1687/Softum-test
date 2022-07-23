import noImage from '../../img/no-image.png';
import 'slick-carousel';
import { updatePopupInfo } from './popup';

export const createMoviesList = (data) => {
    console.log(data);
    const movieListElement = document.querySelector('.js-movies-list');

    document.querySelector('.js-movies-list').classList.contains('slick-initialized') ? $('.js-movies-list').slick('unslick') : null
    movieListElement.innerHTML = ''; // clear all html before appending new markup

    const moviesNodes = data.map(movie => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movies__item js-movie-item';
        movieElement.id = movie.id;
        movieElement.innerHTML = `
                            <img src="${noImage}" class="movies__poster" alt="Movie"/>
                            <div class="movies__name">${movie.title}</div>
                            `;
        movieListElement.appendChild(movieElement);
        return movieElement;
    })

    createCarousel();

    moviesNodes.forEach(movieNode => {
        movieNode.addEventListener('click', e => {
            updatePopupInfo(e.currentTarget.id, data);
        })
    });
}

const createCarousel = () => {
    const slickSettings = {
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 1, 
    }

    $('.js-movies-list').slick(slickSettings);
}

