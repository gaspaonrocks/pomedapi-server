let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  tags: {
    type: String,
    enum: ["tag1", "tag2"],
    required: false
  },
  author: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Post", PostSchema);
