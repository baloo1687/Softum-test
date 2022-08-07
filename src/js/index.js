import { getData } from "./components/getData";
import { createMoviesList } from "./components/movieLists";
import { hidePopup } from "./components/popup";
import { sort } from "./components/sort";

document.addEventListener("DOMContentLoaded", async () => {
    const moviesSection = document.querySelector('.js-section');
    const data = await getData();

    createMoviesList(data);

    moviesSection.addEventListener('click', (e) => {
        if (e.target.classList.contains('js-popup-overlay')) {
            hidePopup();
        }

        if (e.target.classList.contains('js-sort-button')) {
            const sortBy = e.target.getAttribute('data-sortby');
            sort(sortBy, data);
        }

        if (e.target.classList.contains('js-sort-placeholder')) {
            const sortContainer = e.target.closest('.sort');
            sortContainer.classList.toggle('open');
        }
    })
});

