exports.up = function (knex) {
  return knex.schema.createTable('bridges', (table) => {
    table.integer('id').unique().primary();
    table.string('name', 255).notNullable();
    table.string('type', 255).notNullable();
    table.string('stage', 255).notNullable();
    table.string('subStage', 255).notNullable();
    table.float('individualsDirectlyServed').notNullable();
    table.float('span').notNullable();
    table.float('latitude').notNullable();
    table.float('longitude').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('bridges');
};
