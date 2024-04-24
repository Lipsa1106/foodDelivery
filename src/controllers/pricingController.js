const Pricing = require("../models/pricingModel");
const Item = require("../models/itemModel");

// Create a new pricing
exports.createPricing = async (req, res) => {
  try {
    const pricing = new Pricing(req.body);
    await pricing.save();
    res.status(201).json(pricing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all pricing
exports.getAllPricing = async (req, res) => {
  try {
    const pricing = await Pricing.find();
    res.json(pricing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get pricing by ID
exports.getPricingById = async (req, res) => {
  try {
    const pricing = await Pricing.findById(req.params.id);
    if (!pricing) {
      return res.status(404).json({ message: "Pricing not found" });
    }
    res.json(pricing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update pricing by ID
exports.updatePricingById = async (req, res) => {
  try {
    const pricing = await Pricing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!pricing) {
      return res.status(404).json({ message: "Pricing not found" });
    }
    res.json(pricing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete pricing by ID
exports.deletePricingById = async (req, res) => {
  try {
    const pricing = await Pricing.findByIdAndDelete(req.params.id);
    if (!pricing) {
      return res.status(404).json({ message: "Pricing not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.checkItemPrice = async (req, res) => {
  try {
    const { zone, organization_id, total_distance, item_id } = req.body;

    // Find pricing details based on organization, item, and zone
    const pricing = await Pricing.findOne({
      organization: organization_id,
      item: item_id,
      zone: zone,
    });
    const item = await Item.findById({ _id: item_id });
    if (!pricing) {
      return res.status(404).json({ message: "Pricing details not found" });
    }
    if (!item) {
      return res.status(404).json({ message: "Item details not found" });
    }

    // Determine pricing based on item type
    let kmPrice =
      item?.type === "perishable"
        ? pricing?.kmPricePerishable
        : pricing?.kmPriceNonPerishable;
    let fixPrice = pricing.fixPrice;
    let totalPrice;
    // Calculate total price
    if (total_distance > pricing.baseDistanceInKm) {
      totalPrice = (total_distance - pricing.baseDistanceInKm) * kmPrice;
      res.json({ total_price: totalPrice + fixPrice });
    } else {
      return res
        .status(404)
        .json({ message: "Total distance can not less then base distance" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
