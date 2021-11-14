const db = require('../kenx');

class QuestionCategory {
  // select all

  static async getAll() {
    return db('questioncategory').select('*').orderBy('created_at', 'desc');
  }

  // select one
  static async getById(id) {
    return db('questioncategory').select('*').where('id', '=', id);
  }

  static async getByCategory(id) {
    return db('questioncategory')
      .select('question.*')
      .join('question', 'question.id', '=', 'questioncategory.question_id')
      .where('category_id', '=', id)
      .orderBy('question.id', 'asc');
  }

  static async getByQuestion(id) {
    return db('questioncategory')
      .select('category.*', 'questioncategory.question_id')
      .join('category', 'category.id', '=', 'questioncategory.category_id')
      .whereIn('question_id', id)
      .orderBy('category.id', 'asc');
  }

  // insert

  static async insert(data) {
    return db('questioncategory').insert(data);
  }
  //update

  static async update(data) {
    const { id, ...toUpdate } = data;
    return db('questioncategory')
      .returning('*')
      .where('id', '=', id)
      .update(toUpdate);
  }
  //delete

  static async delete(id) {
    return db('questioncategory').where('id', '=', id).del();
  }

  static async deleteByQuestion(id) {
    return db('questioncategory').where('question_id', '=', id).del();
  }

  static async getCategoryQuestions(id) {
    return db('questioncategory')
      .select('question.*', 'questioncategory.*')
      .innerJoin('question', 'question.id', '=', 'questioncategory.question_id')
      .where('category_id', '=', id);
  }
}
module.exports = QuestionCategory;
