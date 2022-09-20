const express = require("express");
const path = require("path");
const morgan = require("morgan");
require("dotenv").config();
require("./config/db");
const userRoute = require("./routes/user");
const uploadRoute = require("./routes/upload");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRoute);
app.use("/api/upload", uploadRoute);

const __directoryName = path.resolve();
app.use("/uploads", express.static(path.join(__directoryName, "/uploads")));

let port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
