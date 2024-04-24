const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["perishable", "non-perishable"],
    required: true,
  },
  description: String,
});

const Item = mongoose.model("items", itemSchema);

module.exports = Item;
