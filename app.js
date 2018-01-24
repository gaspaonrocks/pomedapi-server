"use strict";

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

let Router = require("universal-node-router");
let router = new Router(__dirname);

// Passport configuration
let auth = require("./js-backend/config/passport");
// Configure and get passport authentication object
let passport = auth();

// Create an Express application
let app = express();

// Tell Express where is our favicon
//app.use(favicon(env.publicPath + '/favicon.ico'));
// Tell Express that messages bodies will be JSON formatted
app.use(bodyParser.json());
// Only parses urlencoded bodies (gzip and deflate enabled)
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Set default static files path
/* app.use(express.static(env.publicPath, {
  etag: false
})); */

// Initialize passport used by express for authentication
app.use(passport.initialize());

// Set web service routes
app.use("/api", router.mapper("./js-backend/controllers"));

// Unknown route handler
app.use((req, res) => {
  res.status(404).send("The requested page doesn't exist!");
});

// Errors handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err);
});

// Connect to database
mongoose.Promise = require("bluebird");
mongoose
  .connect("mongodb://localhost:27017/pomedapi-server-dev", {
    promiseLibrary: require("bluebird")
  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
    // Get port from environment and store in Express.
    const port = parseInt(process.env.PORT, 10) || 12345;

    // Finally, create the HTTP server
    app.listen(port, () => {
      console.log("Listening on port " + port);
    });
  })
  .catch(err => {
    if (err) throw err;
  });
