const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

// GET all items
router.get("/", itemController.getAllItems);

// GET item by ID
router.get("/:id", itemController.getItemById);

// Create a new item
router.post("/", itemController.createItem);

// Update item by ID
router.put("/:id", itemController.updateItemById);

// Delete item by ID
router.delete("/:id", itemController.deleteItemById);

module.exports = router;
