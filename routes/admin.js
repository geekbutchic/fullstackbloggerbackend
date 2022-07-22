const express = require("express");
const router = express.Router();

const { blogsDB } = require("./mongo");

const deletePosts = async (blogIds) => {
  try {
    const collection = await blogsDB().collection("posts");
    await collection.deleteMany({
      id: {
        $in: blogIds,
      },
    });
  } catch (e) {
    console.log(e);
    throw Error(e)
  }
};
 
// TESTED IN POSTMAN ROUTE WORKS
//http://localhost:4000/admin/blog-list
router.get("/blog-list", async (req, res) => {
  try {
    const collection = await blogsDB().collection("posts");
    const blogList = await collection.find({}).project({ text: 0 }).toArray();
    res.status(200).json({ message: blogList, success: true });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: `Failed to load content ${e}`, success: false });
  }
});

router.put("/edit-blog", async (req, res) => {
  const blogId = Number(req.body.blogId);
  const title = req.body.title;
  const text = req.body.text;
  const author = req.body.author;

  await updatedPost(blogId, title, text, author);
  res.send("OK");
});

router.delete("/delete-blog/:blogId", async (req, res) => {
  try {
    const blogId = Number(req.params.blogId);
    await deletePosts([blogId]);
    res.status(200).json({ message : `Blog: ${blogId} Deleted`, success : true})
  } catch (e) {
    console.log(e);
    res.status(500).json({ message : `${e}`, success: false})
  }
});

module.exports = router;
