export const getData = async () => {
    const url = 'https://api.themoviedb.org/3/movie/now_playing/?api_key=975f1a9066e00e9d976f19154be0cfc4';
    const pageCount = 3;
    const fullMoviesData = [];

    for (let i = 1; i <= pageCount; i++) {
        const moviesData = await fetch(`${url}&page=${i}`);
        const moviesJson = await moviesData.json();
        fullMoviesData.push(...moviesJson.results);
    }

    return fullMoviesData;
}