const express = require("express");
const router = express.Router();
const organizationController = require("../controllers/organizationController");

// Create a new organization
router.post("/", organizationController.createOrganization);

// Get all organizations
router.get("/", organizationController.getAllOrganizations);

// Get organization by ID
router.get("/:id", organizationController.getOrganizationById);

// Update organization by ID
router.put("/:id", organizationController.updateOrganizationById);

// Delete organization by ID
router.delete("/:id", organizationController.deleteOrganizationById);

module.exports = router;
