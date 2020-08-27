exports.up = function (knex) {
  return knex.schema.createTable('bridges', (table) => {
    table.increments();
    table.string('project_code').unique();
    table.string('name', 255);
    table.string('type', 255);
    table.string('stage', 255);
    table.string('sub_stage', 255);
    table.float('individuals_directly_served');
    table.float('span');
    table.float('latitude');
    table.float('longitude');
    table.string('country', 255);
    table.string('province', 255);
    table.string('district', 255);
    table.string('sector', 255);
    table.string('cell', 255);
    table.string('form_name', 255);
    table.string('case_safe_id_form', 255);
    table.string('bridge_opportunity_id', 255);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('bridges');
};
