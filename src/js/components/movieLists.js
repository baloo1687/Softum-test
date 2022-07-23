import noImage from '../../img/no-image.png';
import 'slick-carousel';
import { updatePopupInfo } from './popup';

export const createMoviesList = (data) => {
    const movieListElements = document.querySelectorAll('.js-movies-list');

    movieListElements.forEach(element => {
        element.classList.contains('slick-initialized') ? $('.js-movies-list').slick('unslick') : null
        element.innerHTML = ''; // clear all html before appending new markup
    })
    

    const moviesNodes = data.map((movie, index) => {
        const movieElement = document.createElement('div');
        const moviePoster = movie.backdrop_path ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}` : noImage

        movieElement.className = 'movies__item js-movie-item';
        movieElement.id = movie.id;
        movieElement.innerHTML = `
                            <img src="${moviePoster}" class="movies__poster" alt="Movie"/>
                            <div class="movies__name">${index + 1}. ${movie.title}</div>
                            `;
        
        movieListElements.forEach(element => element.appendChild(movieElement))

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
        rows: 2,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            }, {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    }

    $('.js-movies-slider').slick(slickSettings);
}

