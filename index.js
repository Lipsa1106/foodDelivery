require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const {
  itemRoutes,
  pricingRoutes,
  organizationRoutes,
} = require("./src/routes");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use("/pricing", pricingRoutes);
app.use("/items", itemRoutes);
app.use("/organizations", organizationRoutes);

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connect to MongoDB
console.log(process.env?.DB_URL);

const uri = process.env.DB_URL;

mongoose
  .connect(process.env.DB_URL, {
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
