const Organization = require("../models/organizationModel");

// Create a new organization
exports.createOrganization = async (req, res) => {
    try {
        const organization = new Organization(req.body);
        console.log(req.body);
        await organization.save();
        res.status(201).json(organization);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all organizations
exports.getAllOrganizations = async (req, res) => {
    try {
        const organizations = await Organization.find();
        res.json(organizations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get organization by ID
exports.getOrganizationById = async (req, res) => {
    try {
        const organization = await Organization.findById(req.params.id);
        if (!organization) {
            return res.status(404).json({ message: "Organization not found" });
        }
        res.json(organization);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update organization by ID
exports.updateOrganizationById = async (req, res) => {
    try {
        const organization = await Organization.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!organization) {
            return res.status(404).json({ message: "Organization not found" });
        }
        res.json(organization);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete organization by ID
exports.deleteOrganizationById = async (req, res) => {
    try {
        const organization = await Organization.findByIdAndDelete(req.params.id);
        if (!organization) {
            return res.status(404).json({ message: "Organization not found" });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};