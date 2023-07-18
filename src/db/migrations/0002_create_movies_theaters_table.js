exports.up = function(knex) {
    return knex.schema
        .createTable("movies_theaters", function(table) {
            table.integer("movie_id");
            table.foreign("movie_id").references("movies.movie_id");
            table.integer("theater_id");
            table.foreign("theater_id").references("theaters.theater_id");
            table.boolean("is_showing").notNullable().defaultTo(false);
            table.primary(["movie_id", "theater_id"]);
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("movies_theaters");
};