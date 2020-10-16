const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const passport = require("passport");
const axios = require("axios");

// API Routes for data pertaining to our DB
router.use("/api", apiRoutes);

console.log("In the routes / index file");

 



  // Client Side Routes all go to our React APP
  router.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });


  module.exports = router;