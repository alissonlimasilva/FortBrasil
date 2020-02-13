// configurações para cloud function firebase
// const functions = require("firebase-functions")
const nocache = require("nocache");
const express = require("express");
require("dotenv/config");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

const app = express();

mongoose.connect(process.env.MONGODB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(cors());
app.use(express.json());
app.use(nocache());
app.use(routes);
app.listen(process.env.EXPRESS_PORT);

// configurações para cloud function firebase
// exports.generatePlacaCreace = functions.https.onRequest(app);
