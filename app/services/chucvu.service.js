const { ObjectId } = require("mongodb") ;

class ChucVuService {
  constructor(client) {
    this.ChucVu = client.db().collection("ChucVu");
  }
  extractContactData(payload) {
    const chucVu = {
      name: payload.name,
 
    };
    Object.keys(chucVu).forEach(
      (key) => chucVu[key] === undefined && delete chucVu[key]
    );
    return chucVu;
  }
  async create(payload) {
    const chucVu = this.extractContactData(payload);
    const result = await this.ChucVu.findOneAndUpdate(
        chucVu,
      {
        $set: { name: chucVu.name},
      },
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  }
  async find(filter) {
    const cursor = await this.ChucVu.find(filter);
    return await cursor.toArray();
  }
  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }
  async findById(id) {
    return await this.ChucVu.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }
  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractContactData(payload);
    const result = await this.ChucVu.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }
  async delete_id(id) {
    const result = await this.ChucVu.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }
  async findFavorite() {
    return await this.find({ favorite: true });
  }
  async deleteAll() {
    const result = await this.ChucVu.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = ChucVuService;
