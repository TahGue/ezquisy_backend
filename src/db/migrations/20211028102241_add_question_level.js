
exports.up = function (knex) {
    return knex.schema.createTable('questionlevel', (table) => {
      table.increments('id');
      table.integer('question_id').references('id').inTable('qusetion');
      table.integer('level_id').references('id').inTable('level');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('questionlevel');
  };