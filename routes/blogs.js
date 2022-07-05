const express = require("express");
const router = express.Router();

router.get("/hello-blogs", (req, res, next) => {
  res.json({message: "Hello from express"});
});

module.exports = router;
