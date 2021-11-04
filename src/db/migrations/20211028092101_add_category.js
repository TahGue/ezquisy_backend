exports.up = function (knex) {
    return knex.schema.createTable('category', (table) => {
      table.increments('id');
      table.string('name');
      table.text('image');
      table.boolean('is_active');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('category');
  };
  