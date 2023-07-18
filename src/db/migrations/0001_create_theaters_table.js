exports.up = function(knex) {
    return knex.schema
        .createTable("theaters", function(table) {
            table.increments("theater_id").primary();
            table.string("name", 255).notNullable();
            table.string("address_line_1", 255).notNullable();
            table.string("address_line_2", 255).notNullable();
            table.string("city", 255).notNullable();
            table.string("state", 2).notNullable();
            table.string("zip", 10).notNullable();
            table.timestamps(true, true);
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("theaters");
};