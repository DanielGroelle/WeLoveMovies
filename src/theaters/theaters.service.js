const knex = require("../db/connection");

async function list() {
    let theatersData = await knex("theaters")
        .select("*");

    let moviesData = await knex("movies as m")
        .select("*")
        .join("movies_theaters as mv", "m.movie_id", "=", "mv.movie_id");
    
    //initializing an object that has each movie for a theater assigned to an array
    const theaterIdToMovies = {};
    for (const movie of moviesData) {
        //null coalescing operator to initialize the array if it is undefined
        theaterIdToMovies[movie.theater_id] ??= [];
        theaterIdToMovies[movie.theater_id].push(movie);
    }

    //joining the movie data with each theater
    return theatersData.map(theater => {
        return {
            ...theater,
            movies: theaterIdToMovies[theater.theater_id]
        }
    });
}

function read(movieId) {
    return knex("theaters as t")
        .select("*")
        .join("movies_theaters as mv", "mv.theater_id", "=", "t.theater_id")
        .where({"movie_id": Number(movieId)});
}

module.exports = {
    list,
    read,
};