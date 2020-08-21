exports.up = function (knex) {
  return knex.schema
    .createTable('villages', (table) => {
      table.increments();
      table.integer('vill_id').notNullable();
      table.string('name', 255).notNullable();
      table.integer('prov_id').notNullable();
      table.string('province', 255).notNullable();
      table.integer('dist_id').notNullable();
      table.integer('sect_id').notNullable();
      table.string('sector', 255).notNullable();
      table.integer('cell_id').notNullable();
      table.string('status', 255).notNullable();
      table.integer('fid').notNullable();
    })
    .createTable('communities_served', (table) => {
      table.increments();
      table
        .integer('bridge_id')
        .unsigned()
        .notNullable()
        .references('bridges.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('village_id')
        .unsigned()
        .notNullable()
        .references('villages.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('communities_served')
    .dropTableIfExists('villages');
};
