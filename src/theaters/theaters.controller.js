const theatersService = require("./theaters.service");

async function list(req, res, next) {
    const {movieId} = req.params;
    let data;

    //if the route includes a movieId, get all the theaters where that movie is playing
    if (movieId) {
        data = await theatersService.read(movieId);
    }
    //otherwise, return all theater data
    else {
        data = await theatersService.list();
    }
    
    res.status(200).json({data});
}

module.exports = {
    list,
}