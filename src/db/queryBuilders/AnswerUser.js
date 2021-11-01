const db = require("../kenx");

class AnswerUser {
  // select all

  static async getAll() {
    return db("answeruser").select("*").orderBy("created_at", "desc");
  }

  // select one
  static async getById(id) {
    return db("answeruser").select("*").where("id", "=", id);
  }
  // insert

  static async insert(data) {
    return db("answeruser").insert(data);
  }
  //update

  static async update(data) {
    const { id, ...toUpdate } = data;
    return db("answeruser")
      .returning("*")
      .where("id", "=", id)
      .update(toUpdate);
  }
  //delete

  static async delete(id) {
    return db("answeruser").where("id", "=", id).del();
  }
}

module.exports = AnswerUser;
