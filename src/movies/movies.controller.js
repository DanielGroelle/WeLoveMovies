const moviesService = require("./movies.service");

function movieExists() {
    const {movieId} = req.params;
    next();
}

async function list(req, res, next) {
    const showing = req.query?.["is_showing"];
    const data = await moviesService.list(showing);
    res.status(200).json({data});
}

async function read(req, res, next) {
    res.status(400);
}

module.exports = {
    list,
    read: [movieExists, read],
};