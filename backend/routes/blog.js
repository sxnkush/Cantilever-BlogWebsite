const express = require("express");
const {
  handleBlogFetch,
  handleBlogCreation,
  handleBlogDetail,
  handleLiked,
  handleMyBlogFetch, 
  handleDeleteBlog,
  handleEditBlog
} = require("../controllers/blog");
const router = express.Router();

router.get("/", handleBlogFetch);
router.get("/myblog", handleMyBlogFetch);
router.get("/blogDetail/:blogId", handleBlogDetail);
router.post("/", handleBlogCreation);
router.post("/liked/:blogId", handleLiked);
router.post("/edit/:blogId", handleEditBlog);
router.delete("/:blogId",handleDeleteBlog)

module.exports = router;
