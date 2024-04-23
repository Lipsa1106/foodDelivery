// services/priceCalculationService.js
const Pricing = require("../models/pricingModel");

async function calculateTotalPrice(
  zone,
  organizationId,
  totalDistance,
  itemType
) {
  try {
    const pricing = await Pricing.findOne({
      organization: organizationId,
      zone,
    }).populate("item");
    if (!pricing) {
      throw new Error("Pricing not found");
    }

    const baseDistance = pricing.baseDistanceInKm;
    const basePrice = pricing.fixPrice;
    const perKmPrice =
      itemType === "perishable"
        ? pricing.kmPricePerishable
        : pricing.kmPriceNonPerishable;

    let totalPrice = basePrice;
    if (totalDistance > baseDistance) {
      const additionalDistance = totalDistance - baseDistance;
      totalPrice += additionalDistance * perKmPrice;
    }

    return totalPrice;
  } catch (error) {
    throw new Error("Failed to calculate total price: " + error.message);
  }
}

module.exports = { calculateTotalPrice };
