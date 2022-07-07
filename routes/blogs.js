const express = require("express");
const router = express.Router();
const { blogsDB } = require("./mongo");

router.get("/hello-blogs", (req, res, next) => {
  res.json({ message: "Hello from express" });
});

router.get("/all-blogs", async (req, res, next) => {
  try {
    const collection = await blogsDB().collection("posts")
    const allBlogs = await collection.find({}).toArray()
    res.json(allBlogs)
    
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
