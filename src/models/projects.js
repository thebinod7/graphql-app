const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: String,
    status: String,
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  },
  { collection: "projects", timestamps: true }
);

module.exports = mongoose.model("Project", schema);
