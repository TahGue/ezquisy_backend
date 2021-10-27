exports.up = function (knex) {
  return knex.schema.createTable('questionType', (table) => {
    table.increments('id');
    table.string('name');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('questionType');
};
