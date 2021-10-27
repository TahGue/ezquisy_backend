const db = require('../kenx');

class QuestionType {
  // select all

  static async getAll() {
    return db('questionType').select('*').orderBy('created_at', 'desc');
  }

  // select one
  static async getById(id) {
    return db('questionType').select('*').where('id', '=', id);
  }
  // insert

  static async insert(data) {
    return db('questionType').insert(data);
  }
  //update

  static async update(data) {
    const { id, ...toUpdate } = data;
    return db('questionType')
      .returning('*')
      .where('id', '=', id)
      .update(toUpdate);
  }
  //delete

  static async delete(id) {
    return db('questionType').where('id', '=', id).del();
  }
}

module.exports = QuestionType;
