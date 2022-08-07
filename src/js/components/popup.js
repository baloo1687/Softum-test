import noImage from '../../img/no-image.png';

export const updatePopupInfo = (movieInfo) => {
    const moviePoster = movieInfo.backdrop_path ? `https://image.tmdb.org/t/p/original/${movieInfo.backdrop_path}` : noImage;

    const popupContentNode = document.querySelector('.js-popup-content');
    popupContentNode.innerHTML = `<img src="${moviePoster}" class="popup__img" alt="${movieInfo.title}">
                                    <div class="popup__name">${movieInfo.title}</div>
                                    <div class="popup__subinfo">
                                        <div class="popup__date">Release: ${movieInfo.release_date}</div>
                                        <div class="popup__rating">IMDb: ${movieInfo.vote_average}</div>
                                        <div class="popup__language">Original language: <span class="popup__language--uppercase">${movieInfo.original_language}</span></div>
                                    </div>
                                    <div class="popup__description">${movieInfo.overview}</div>`
    
    showPopup();
}

export const showPopup = () => {
    const popup = document.querySelector('.js-popup');
    popup.classList.add('show');
}

export const hidePopup = () => {
    const popup = document.querySelector('.js-popup');
    popup.classList.remove('show');
}