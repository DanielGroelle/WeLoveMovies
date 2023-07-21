const knex = require("../db/connection");

async function list() {
    //get all theater data
    let theatersData = await knex("theaters")
        .select("*");

    //get all movies data
    let moviesData = await knex("movies as m")
        .select("*")
        .join("movies_theaters as mv", "m.movie_id", "=", "mv.movie_id");
    
    //initializing an object that has each movie for a theater assigned to an array
    const theaterIdToMovies = {};
    for (const movie of moviesData) {
        //if the key-value pair doesnt exist yet initialize it to an empty array
        if (theaterIdToMovies[movie.theater_id] === undefined) {
            theaterIdToMovies[movie.theater_id] = [];
        }
        //push the current movie to the correct array based on theater_id
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

//select all theater data where the movieId matches
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