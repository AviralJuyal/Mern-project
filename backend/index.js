const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors");
app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");
MongoDbURL = process.env.MONGODB_URL;
mongoose.connect(MongoDbURL);
var db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error : "));
db.once("open", function () {
  console.log("Database is Ready.... ");
});

app.get("/", (req, res) => {
  res.send("backend is working !");
});

app.use("/api/user", require("./src/routes/userRoutes"));
app.use("/api/notes", require("./src/routes/notesRoutes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
module.exports = app;
