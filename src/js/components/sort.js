import { createMoviesList } from "./movieLists";

export const sort = (sortBy, moviesData) => {
    const sortedData = Object.assign([], moviesData);

    sortedData.sort((a, b) => {
        var nameA = a.title.toUpperCase();
        var nameB = b.title.toUpperCase();

        if (sortBy === 'a-z') {
            return nameA < nameB ? -1 : nameA > nameB ? 1 : 0
        } else {
            return nameA < nameB ? 1 : nameA > nameB ? -1 : 0
        }
    });

    createMoviesList(sortedData);
}