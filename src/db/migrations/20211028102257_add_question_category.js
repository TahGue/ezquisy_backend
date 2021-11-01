
exports.up = function (knex) {
    return knex.schema.createTable('questioncategory', (table) => {
      table.increments('id');
      table.integer('question_id').references('id').inTable('qusetion');
      table.integer('category_id').references('id').inTable('category');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('questioncategory');
  };