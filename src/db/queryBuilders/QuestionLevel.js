const db = require('../kenx');

class QuestionLevel {
  // select all

  static async getAll() {
    return db('questionlevel').select('*').orderBy('created_at', 'desc');
  }

  // select one
  static async getById(id) {
    return db('questionlevel').select('*').where('id', '=', id);
  }
  // insert

  static async insert(data) {
    return db('questionlevel').insert(data);
  }
  //update

  static async update(data) {
    const { id, ...toUpdate } = data;
    return db('questionlevel')
      .returning('*')
      .where('id', '=', id)
      .update(toUpdate);
  }
  //delete

  static async delete(id) {
    return db('questionlevel').where('id', '=', id).del();
  }
}

module.exports = QuestionLevel;
