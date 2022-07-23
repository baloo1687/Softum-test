import { getData } from "./components/getData";
import { createMoviesList } from "./components/movieLists";
import { hidePopup } from "./components/popup";
import { sort } from "./components/sort";

document.addEventListener("DOMContentLoaded", async () => {
    const popupOverlay = document.querySelector('.js-popup-overlay');
    const sortNode = document.querySelector('.js-sort')
    const sortButtons = sortNode.querySelectorAll('.js-sort-button');
    const sortPlaceholder = document.querySelector('.js-sort-placeholder');
    const data = await getData();

    createMoviesList(data);

    popupOverlay.addEventListener('click', e => {
        hidePopup();
    })
    
    sortButtons.forEach(sortButton => {
        sortButton.addEventListener('click', e => {
            const sortBy = e.currentTarget.getAttribute('data-sortby');
            sort(sortBy, data);
        })
    })
    
    sortPlaceholder.addEventListener('click', e => {
        const sortContainer = e.target.closest('.sort');
        sortContainer.classList.toggle('open');
    })
});

