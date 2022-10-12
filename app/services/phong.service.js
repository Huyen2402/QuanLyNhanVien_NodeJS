const { ObjectId } = require("mongodb") ;

class PhongService {
  constructor(client) {
    this.Phong = client.db().collection("Phong");
  }
  extractContactData(payload) {
    const phong = {
      name: payload.name,
 
    };
    Object.keys(phong).forEach(
      (key) => phong[key] === undefined && delete phong[key]
    );
    return phong;
  }
  async create(payload) {
    const phong = this.extractContactData(payload);
    const result = await this.Phong.findOneAndUpdate(
        phong,
      {
        $set: { name: phong.name},
      },
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  }
  async find(filter) {
    const cursor = await this.Phong.find(filter);
    return await cursor.toArray();
  }
  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }
  async findById(id) {
    return await this.Phong.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }
  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractContactData(payload);
    const result = await this.Phong.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }
  async delete_id(id) {
    const result = await this.Phong.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }
  async findFavorite() {
    return await this.find({ favorite: true });
  }
  async deleteAll() {
    const result = await this.Phong.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = PhongService;
