const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: String,
    email: String,
    phone: String,
  },
  { collection: "clients", timestamps: true }
);

module.exports = mongoose.model("Client", schema);
