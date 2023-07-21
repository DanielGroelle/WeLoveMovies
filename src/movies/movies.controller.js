const moviesService = require("./movies.service");

//checks if the movieId in the route exists in the db and saves the movie data to res.locals for later use
async function movieExists(req, res, next) {
    const {movieId} = req.params;
    res.locals.foundMovie = await moviesService.read(movieId);
    if (res.locals.foundMovie) {
        next();
    }
    //if it doesnt exist return an error
    else {
        next({message: `Movie id not found: ${movieId}`, status: 404});
    }
}

//list all movies
async function list(req, res, next) {
    //if url has a ?is_showing= query show only movies that correspond to the true or false value of showing
    let showing;
    if (req.query) {
        showing = req.query["is_showing"];
    }

    const data = await moviesService.list(showing);
    res.status(200).json({data});
}

//return the foundMovie from movieExists
async function read(req, res, next) {
    const data = res.locals.foundMovie;
    res.status(200).json({data});
}

module.exports = {
    list,
    read: [movieExists, read],
    movieExists,
};