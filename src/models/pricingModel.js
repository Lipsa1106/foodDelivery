// models/pricingModel.js
const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema({
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  zone: {
    type: String,
    required: true,
  },
  baseDistanceInKm: {
    type: Number,
    required: true,
  },
  kmPricePerishable: {
    type: Number,
    required: true,
  },
  kmPriceNonPerishable: {
    type: Number,
    required: true,
  },
  fixPrice: {
    type: Number,
    required: true,
  },
});

const Pricing = mongoose.model("Pricing", pricingSchema);

module.exports = Pricing;
