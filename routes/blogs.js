const express = require("express");
const router = express.Router();

router.get("/hello-blogs", (req, res, next) => {
  res.json("Hello From Express");
});

module.exports = router;
