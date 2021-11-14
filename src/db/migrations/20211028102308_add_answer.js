exports.up = function (knex) {
  return knex.schema.createTable('answer', (table) => {
    table.increments('id');
    table.string('text');
    table.integer('question_id').references('id').inTable('question');
    table.boolean('is_active');
    table.boolean('is_correct');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('answer');
};
