const db = require('../kenx');

class User {
  // select all

  static async getAll() {
    return db('user').select('*').orderBy('created_at', 'desc');
  }

  // select one
  static async getById(id) {
    return db('user').select('*').where('id', '=', id);
  }

  static async getByEmail(email) {
    return db('user').select('*').where('email', '=', email);
  }

  static async getPoints(userId) {
    // step 1 fetch correct answers by user

    const userAnswers = await db('answer')
      .select('answer.*')
      .join('answeruser', 'answeruser.answer_id', '=', 'answer.id')
      .where('answeruser.user_id', '=', userId)
      .where('answer.is_correct', '=', 'true');
    // fetch questions by step 1
    const questionsIds = userAnswers.map((ans) => ans.question_id);

    const questions = await db('question')
      .sum('question.point as sum')
      .whereIn('question.id', questionsIds);
    return questions[0].sum;
    // sum points
  }

  static async getAllQuestionsPoints() {
    return db('question')
      .sum('question.point as points')
      .then((res) => res[0].points);
  }
  // insert

  static async insert(data) {
    return db('user').insert(data);
  }
  //update

  static async update(data) {
    const { id, ...toUpdate } = data;
    return db('user').returning('*').where('id', '=', id).update(toUpdate);
  }
  //delete

  static async delete(id) {
    return db('user').where('id', '=', id).del();
  }
}

module.exports = User;
