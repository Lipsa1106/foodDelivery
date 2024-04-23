// routes/itemRoutes.js
const express = require("express");
const router = express.Router();
const pricingController = require("../controllers/pricingController");

router.post("/check", pricingController.AddPricing);

module.exports = router;
