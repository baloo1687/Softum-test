import { createMoviesList } from "./movieLists";

export const sort = (sortBy, moviesData) => {
    const sortedData = Object.assign([], moviesData);

    sortedData.sort((a, b) => {
        const paramA = sortBy === 'a-z' || sortBy === 'z-a' ? a.title.toUpperCase() : a.vote_average;
        const paramB = sortBy === 'a-z' || sortBy === 'z-a' ? b.title.toUpperCase() : b.vote_average;

        if (sortBy === 'a-z' || sortBy === 'z-a') {
            if (sortBy === 'a-z') {
                if (paramA < paramB) {
                    return -1;
                } else if (paramA > paramB) {
                    return 1;
                } else {
                    return 0;
                }
            } else {
                if (paramA < paramB) {
                    return 1;
                } else if (paramA > paramB) {
                    return -1
                } else {
                    return 0;
                }
            }
        } else if (sortBy === 'rating') {
            if (paramA < paramB) {
                return 1;
            } else if (paramA > paramB) {
                return -1
            } else {
                return 0;
            }
        }
    });

    createMoviesList(sortedData);
}
