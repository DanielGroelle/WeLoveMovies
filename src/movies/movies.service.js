const knex = require("../db/connection");

function list(showing) {
    if (showing !== undefined) {
        showing = (showing ? 1: 0);
        return knex("movies as m")
            .distinct("m.*", "mv.is_showing")
            .join("movies_theaters as mv", "mv.movie_id", "=", "m.movie_id")
            .where({"is_showing": showing});
    }
    else {
        return knex("movies").select("*");
    }
}

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