const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const { itemRoutes, pricingRoutes, organizationRoutes } = require("./src/routes");
const cors = require("cors");
const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use("/pricing", pricingRoutes);
app.use("/items", itemRoutes);
app.use("/organizations", organizationRoutes);

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/foodDelivery", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
