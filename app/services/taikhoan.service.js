const { ObjectId } = require("mongodb") ;

class TaiKhoanService {
  constructor(client) {
    this.TK = client.db().collection("TaiKhoan");
  }
  extractContactData(payload) {
    const tk = {
      username: payload.username,
      password: payload.password
 
    };
    Object.keys(tk).forEach(
      (key) => tk[key] === undefined && delete tk[key]
    );
    return tk;
  }
  async create(payload) {
    const tk = this.extractContactData(payload);
    const result = await this.TK.findOneAndUpdate(
        tk,
      {
        $set: { username: tk.username, password: tk.password},
      },
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  }
  async find(filter) {
    const cursor = await this.TK.find(filter);
    return await cursor.toArray();
  }
  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }
  async findByNamePass(username, password) {

    return await this.TK.findOne({
 
      username: { $regex: new RegExp(username), $options: "i" },
      password: { $regex: new RegExp(password), $options: "i" },
    });
  
  }
  async findById(id) {
    return await this.TK.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }
  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractContactData(payload);
    const result = await this.TK.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }
  async delete_id(id) {
    const result = await this.TK.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }
  async findFavorite() {
    return await this.find({ favorite: true });
  }
  async deleteAll() {
    const result = await this.TK.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = TaiKhoanService;
