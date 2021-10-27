exports.up = function (knex) {
    return knex.schema.createTable('question', (table) => {
      table.increments('id');
      table.string('question');
      table.integer('point');
      table.integer('question_type_id').references('id').inTable('qusetionType');
      table.boolean('is_active');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('question');
  };
  