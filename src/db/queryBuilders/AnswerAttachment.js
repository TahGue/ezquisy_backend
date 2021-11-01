const db = require('../kenx');

class answerattachment {
  // select all

  static async getAll() {
    return db('answerattachment').select('*').orderBy('created_at', 'desc');
  }

  // select one
  static async getById(id) {
    return db('answerattachment').select('*').where('id', '=', id);
  }
  // insert

  static async insert(data) {
    return db('answerattachment').insert(data);
  }
  //update

  static async update(data) {
    const { id, ...toUpdate } = data;
    return db('answerattachment')
      .returning('*')
      .where('id', '=', id)
      .update(toUpdate);
  }
  //delete

  static async delete(id) {
    return db('answerattachment').where('id', '=', id).del();
  }
}

module.exports = answerattachment;
