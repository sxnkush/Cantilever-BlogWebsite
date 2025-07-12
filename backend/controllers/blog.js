const Blog = require("../models/blog");
const User = require("../models/user");

async function handleBlogFetch(req, res) {
  try {
    const blogData = await Blog.find();
    return res.status(200).json(blogData);
  } catch (err) {
    console.log("Error in fetching Blogs", err);
    return res.status(401).json("Error in Fetching Blogs");
  }
}

async function handleBlogCreation(req, res) {
  try {
    const blog = req.body;
    const userId = req.user._id;  //req.user mai user ke sirf wo details ya field hote hai jo ki humne setUser karte time set akre the
    const user = await User.findById(userId)
    await Blog.create({
      userId: user._id,
      author: user.name,
      title: blog.title,
      content: blog.content,
      image: blog.image,
    });

    return res.status(200).json({ message: "Blog Created Successfully" });
  } catch (error) {
    return res.status(400).json({error:error});
  }
}

async function handleBlogDetail(req, res) {
  try {
    const id = req.params.blogId;
    const blogDetails = await Blog.findById(id);
    if(!blogDetails) return res.status(404).json({message:"Blog Not Found"})
    return res.status(200).json({blog:blogDetails, message: "Success", requestedBy: req.user._id});
  } catch (error) {
    return res.status(400).json("Error in getting blog details");
  }
}

async function handleLiked(req, res) {
  try {
    const id = req.params.blogId;
    const userId = req.user._id;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const alreadyLiked = blog.likedBy.includes(userId.toString());

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      alreadyLiked
        ? { $pull: { likedBy: userId } }
        : { $addToSet: { likedBy: userId } },
      { new: true }
    );

    return res.status(200).json({
      message: "Like status updated",
      likedBy: updatedBlog.likedBy,
    });
  } catch (error) {
    console.error("Error in handling like:", error.message);
    return res.status(500).json({ message: "Error in handling like" });
  }
}


module.exports = {
  handleBlogCreation,
  handleBlogDetail,
  handleBlogFetch,
  handleLiked,
};
