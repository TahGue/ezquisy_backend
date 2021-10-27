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
