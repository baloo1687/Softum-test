import { getData } from "./components/getData";
import { createMoviesList } from "./components/movieLists";
import { hidePopup } from "./components/popup";
import { sort } from "./components/sort";

const popupOverlay = document.querySelector('.js-popup-overlay');
const sortNode = document.querySelector('.js-sort')
const sortButtons = sortNode.querySelectorAll('.js-sort-button');
const sortPlaceholder = document.querySelector('.js-sort-placeholder');

document.addEventListener("DOMContentLoaded", async function() {
    createMoviesList(await getData());
});

popupOverlay.addEventListener('click', (e) => {
    hidePopup();
})

sortButtons.forEach(sortButton => {
    sortButton.addEventListener('click', async e => {
        const sortBy = e.currentTarget.getAttribute('data-sortby');
        sort(sortBy, await getData());
    })
})

sortPlaceholder.addEventListener('click', e => {
    const sortContainer = e.target.closest('.sort');
    sortContainer.classList.toggle('open');
})