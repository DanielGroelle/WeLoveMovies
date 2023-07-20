const theatersService = require("./theaters.service");

async function list(req, res, next) {
    const data = await theatersService.list();
    res.status(200).json({data});
}

module.exports = {
    list,
}