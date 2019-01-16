const mongoose = require("mongoose");
const shortid = require("shortid");

const urlsSchema = mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: shortid.generate
  }
});
module.exports = mongoose.model("shorturl", urlsSchema);
