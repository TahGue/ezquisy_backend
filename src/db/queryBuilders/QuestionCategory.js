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
  static async getCategoryQuestions(id) {
    return db('questioncategory')
      .select('question.*', 'questioncategory.*')
      .innerJoin('question', 'question.id', '=', 'questioncategory.question_id')
      .where('category_id', '=', id);
  }
}
module.exports = QuestionCategory;
