require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();
app.use(express.json());

const authRoute = require("./routes/login_signup");
const noteRoute = require("./routes/noteRoute");

mongoose
  .connect(`${process.env.MONGO_URI}/Fundoo_Notes`)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRoute);
app.use("/api/notes", noteRoute);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
