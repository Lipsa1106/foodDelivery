const express = require("express");
const router = express.Router();
const pricingController = require("../controllers/pricingController");

// Create a new pricing
router.post("/", pricingController.createPricing);

// Get all pricing
router.get("/", pricingController.getAllPricing);

// Get pricing by ID
router.get("/:id", pricingController.getPricingById);

// Update pricing by ID
router.put("/:id", pricingController.updatePricingById);

// Delete pricing by ID
router.delete("/:id", pricingController.deletePricingById);

// Check pricing for an item
router.post("/check", pricingController.checkItemPrice);

module.exports = router;
