exports.up = function(knex) {
    return knex.schema
        .createTable("critics", function(table) {
            table.increments("critic_id").primary();
            table.string("preferred_name", 255).notNullable();
            table.string("surname", 255).notNullable();
            table.string("organization_name", 255).notNullable();
            table.timestamps(true, true);
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("critics");
};