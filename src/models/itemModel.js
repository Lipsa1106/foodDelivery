// models/itemModel.js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  description: String,
});

const Item = mongoose.model("items", itemSchema);

module.exports = Item;
