const db = require('../kenx');

class Question {
  // select all

  static async getAll() {
    return db('question').select('*').orderBy('created_at', 'desc');
  }

  // select one
  static async getById(id) {
    return db('question').select('*').where('id', '=', id);
  }
  // insert

  static async insert(data) {
    return db('question').insert(data);
  }
  //update

  static async update(data) {
    const { id, ...toUpdate } = data;
    return db('question')
      .returning('*')
      .where('id', '=', id)
      .update(toUpdate);
  }
  //delete

  static async delete(id) {
    return db('question').where('id', '=', id).del();
  }
}

module.exports = Question;
