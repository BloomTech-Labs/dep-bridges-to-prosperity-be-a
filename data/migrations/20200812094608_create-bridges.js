exports.up = function (knex) {
  return knex.schema.createTable('bridges', (table) => {
    table.increments();
    table.integer('projectCode').unique().notNullable();
    table.string('name', 255).notNullable();
    table.string('type', 255).notNullable();
    table.string('stage', 255).notNullable();
    table.string('subStage', 255).notNullable();
    table.float('individualsDirectlyServed').notNullable();
    table.float('span').notNullable();
    table.float('latitude').notNullable();
    table.float('longitude').notNullable();
    table.string('country', 255).notNullable();
    table.string('province', 255).notNullable();
    table.string('sector', 255).notNullable();
    table.string('cell', 255).notNullable();
    table.string('formName', 255).notNullable();
    table.string('caseSafeIdForm', 255).notNullable();
    table.string('bridgeOpportunityId', 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('bridges');
};
