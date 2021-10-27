exports.up = function (knex) {
  return knex.schema.createTable('user', (table) => {
    table.increments('id');
    table.string('name');
    table.string('email');
    table.text('image');
    table.string('password');
    table.boolean('is_active');
    table.integer('age');
    table.string('role');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('user');
};
