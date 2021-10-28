
exports.up = function (knex) {
    return knex.schema.createTable('answerattachment', (table) => {
      table.increments('id');
      table.integer('answer_id').references('id').inTable('answer');
      table.string('type');
      table.text('url');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('answerattachment');
  };