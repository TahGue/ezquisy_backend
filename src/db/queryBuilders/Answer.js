const db = require('../kenx');

class Answer {
  // select all

  static async getAll() {
    return db('answer').select('*').orderBy('created_at', 'desc');
  }

  // select one
  static async getById(id) {
    return db('answer').select('*').where('id', '=', id);
  }

  // insert
  static async getByQuestions(id) {
    return db('answer').select('answer.*').whereIn('answer.question_id', id);
  }

  static async insert(data) {
    return db('answer').insert(data);
  }
  //update

  static async update(data) {
    const { id, ...toUpdate } = data;
    return db('answer').returning('*').where('id', '=', id).update(toUpdate);
  }
  //delete

  static async delete(id) {
    return db('answer').where('id', '=', id).del();
  }
}

module.exports = Answer;
