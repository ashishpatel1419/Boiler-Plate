const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const route = require("./app/routes/route");
const categoryRoutes = require("./app/routes/categoryRoutes");
const testimonialRoutes = require("./app/routes/testimonialRoutes");
const contactRoutes = require("./app/routes/contactRoutes");
const portfolioRoutes = require("./app/routes/portfolioRoutes");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/", route);
app.use("/", categoryRoutes);
app.use("/", contactRoutes);
app.use("/", testimonialRoutes);
app.use("/", portfolioRoutes);

// join views and directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app/views"));

app.use(express.static("app/uploads"));

mongoose
  .connect("mongodb://127.0.0.1:/AdminMongoDB")
  .then(() => console.log("Connected to MongoDB...."))
  .catch((err) => console.log("could not connect to MongoDB..."));

const port = process.env.PORT || 2000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
