
exports.up = function (knex) {
    return knex.schema.createTable('answeruser', (table) => {
      table.increments('id');
      table.integer('answer_id').references('id').inTable('answer');
      table.integer('user_id').references('id').inTable('user');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('answeruser');
  };