
exports.up = function (knex) {
    return knex.schema.createTable('level', (table) => {
      table.increments('id');
      table.string('name');
      table.integer('image');
      table.integer('points');
      table.boolean('is_active');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('level');
  };