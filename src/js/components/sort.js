import { createMoviesList } from "./movieLists";

export const sort = (sortBy, moviesData) => {
    const sortedData = Object.assign([], moviesData);

    sortedData.sort((a, b) => {
        const paramA = sortBy === 'a-z' || sortBy === 'a-z' ? a.title.toUpperCase() : a.vote_average;
        const paramB = sortBy === 'a-z' || sortBy === 'a-z' ? b.title.toUpperCase() : b.vote_average;

        if (sortBy === 'a-z' || sortBy === 'a-z') {
            return sortBy === 'a-z' ? paramA < paramB ? -1 : paramA > paramB ? 1 : 0 : paramA < paramB ? 1 : paramA > paramB ? -1 : 0;
        } else if (sortBy === 'rating') {
            return paramA < paramB ? 1 : paramA > paramB ? -1 : 0;
        }
    });

    createMoviesList(sortedData);
}
