const knex = require("../db/connection");

function list(showing) {
    //returns all movies that match the showing query parameter
    //join with movies_theaters table to include the is_showing column for the movie
    if (showing !== undefined) {
        showing = (showing ? 1: 0);
        return knex("movies as m")
            .distinct("m.*", "mv.is_showing")
            .join("movies_theaters as mv", "mv.movie_id", "=", "m.movie_id")
            .where({"is_showing": showing});
    }
    //returns all movies if no showing query
    else {
        return knex("movies").select("*");
    }
}

//return a specific movie based on the movieId
//will return undefined if movieId is not valid
function read(movieId) {
    const foundMovie = knex("movies")
        .select("*")
        .where({"movie_id": Number(movieId)})
        .then((data)=>data[0]);
        
    return foundMovie;
}

module.exports = {
    list,
    read,
};