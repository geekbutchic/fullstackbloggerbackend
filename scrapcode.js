try {
  const collection = await blogsDB().collection("posts");
  // const allBlogs = await collection.find({}).toArray();
  if (filterField && filterValue) {
    filterObj = { [filterField]: filterValue.toLowerCase() };
  }
  let sortObj = {};
  if (sortField && sortOrder) {
    let order = sortOrder === "ASC" ? 1 : -1;
    sortObj = { [sortField]: order };
  }
  // console.log(filterObj);
  const dbResult = await collection
    .find(filterObj)
    .sort(sortObj)
    .limit(limit)
    .skip(skip)
    .toArray();
  //sends response
  console.log(dbResult);
  res.json(dbResult);
} catch (e) {
  console.log(e);
}

try {
  const collection = await blogsDB().collection("posts");
  const count = await collection.count();
  const title = req.body.title;
  const text = req.body.text;
  const author = req.body.author;
  const blogPost = {
    title: title,
    text: text,
    author: author,
    createdAt: new Date().toISOString(),
    id: count + 1,
    lastModified: new Date().toISOString(),
  };
  const savedPost = await collection.insertOne(blogPost);
  res.json({ savedPost: blogPost });
} catch (error) {
  res.status(500).json({ error: error });
}

router.get("/blog-list", async (req, res, next) => {
  try {
    const collection = await blogsDB().collection("posts");
    const blogs = await collection
      .find({})
      .sort({ id: - 1 })
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
    console.log(e);
    res
      .status(500)
      .json({ message: `Failed to load content ${e}`, success: false });
  }
});