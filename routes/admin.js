const express = require("express");
const router = express.Router();

const { blogsDB } = require("./mongo");

// [id, title, author, createdAt, lastModified]
// TESTED IN POSTMAN ROUTE WORKS
router.get("/blog-list", async (req, res, next) => {
  try {
    const collection = await blogsDB().collection("posts");
    const blogs = await collection
      .find({})
      .sort({ id: -1 })
      .project({
        id: 1,
        title: 1,
        author: 1,
        createdAt: 1,
        lastModified: 1,
        category: 1,
      })
      .toArray();
    res
    .status(200).json({ message: blogs, success: true });
  } catch (e) {
    res
      .status(500)
      .json({ message: `Failed to load content ${e}`, success: false });
  }
});



module.exports = router;
