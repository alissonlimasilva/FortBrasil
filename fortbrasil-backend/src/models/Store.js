const mongoose = require("mongoose");
const PointSchema = require("./utils/PointSchema");

const { Schema } = mongoose;

const StoreSchema = new Schema({
  name: String,
  razaoSocial: String,
  address: String,
  logo: String,
  description: String,
  location: {
    type: PointSchema,
    index: "2dsphere"
  },
  user: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Store", StoreSchema);
