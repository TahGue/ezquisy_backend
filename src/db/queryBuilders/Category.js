const db = require('../kenx');

class Category {
  // select all

  static async getAll() {
    return db('category')
      .leftJoin(
        'questioncategory',
        'questioncategory.category_id',
        '=',
        'category.id'
      )
      .leftJoin('question', 'question.id', '=', 'questioncategory.question_id')
      .select('category.*')
      .sum('question.point as points')
      .groupBy('category.id')
      .orderBy('created_at', 'desc')
      .then((res) => res)
      .catch((err) => {
        return err;
      });
  }

  static async getUserCategoriesPoints(userId) {
    const userAnswers = await db('answer')
      .select('answer.*')
      .join('answeruser', 'answeruser.answer_id', '=', 'answer.id')
      .where('answeruser.user_id', '=', userId)
      .where('answer.is_correct', '=', 'true');
    // fetch questions by step 1
    const questionsIds = userAnswers.map((ans) => ans.question_id);

    const categorisWithPoint = await db('category')
      .leftJoin(
        'questioncategory',
        'questioncategory.category_id',
        '=',
        'category.id'
      )
      .leftJoin('question', 'question.id', '=', 'questioncategory.question_id')
      .select('category.*')
      .sum('question.point as points')
      .whereIn('question.id', questionsIds)
      .groupBy('category.id')
      .orderBy('created_at', 'desc');

    return categorisWithPoint;
  }

  // select one
  static async getById(id) {
    return db('category').select('*').where('id', '=', id);
  }
  // insert

  static async insert(data) {
    return db('category').insert(data);
  }
  //update

  static async update(data) {
    const { id, ...toUpdate } = data;
    return db('category').returning('*').where('id', '=', id).update(toUpdate);
  }
  //delete

  static async delete(id) {
    return db('category').where('id', '=', id).del();
  }
}

module.exports = Category;
