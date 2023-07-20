const knex = require("../db/connection");

function list() {
    //incomplete
    return knex("theaters")
        .select("*");
}

module.exports = {
    list,
};