export const updatePopupInfo = (id, moviesData) => {
    const movieInfo = moviesData.find(movie => movie.id == id);

    const popupContentNode = document.querySelector('.js-popup-content');
    popupContentNode.innerHTML = `<img src="${movieInfo.poster_path}" class="popup__img" alt="${movieInfo.title}">
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
    popup.classList.toggle('show');
}

export const hidePopup = () => {
    const popup = document.querySelector('.js-popup');
    popup.classList.toggle('show');
}