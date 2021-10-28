const db = require('../kenx');

class Category {
  // select all

  static async getAll() {
    return db('category').select('*').orderBy('created_at', 'desc');
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
    return db('category')
      .returning('*')
      .where('id', '=', id)
      .update(toUpdate);
  }
  //delete

  static async delete(id) {
    return db('category').where('id', '=', id).del();
  }
}

module.exports = Category;
