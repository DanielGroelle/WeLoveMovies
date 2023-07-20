const moviesService = require("./movies.service");

async function movieExists(req, res, next) {
    const {movieId} = req.params;
    res.locals.foundMovie = await moviesService.read(movieId);
    if (res.locals.foundMovie) {
        next();
    }
    else {
        next({message: `Movie id not found: ${movieId}`, status: 404});
    }
}

async function list(req, res, next) {
    const showing = req.query?.["is_showing"];
    const data = await moviesService.list(showing);
    res.status(200).json({data});
}

async function read(req, res, next) {
    const data = res.locals.foundMovie;
    res.status(200).json({data});
}

module.exports = {
    list,
    read: [movieExists, read],
    movieExists,
};