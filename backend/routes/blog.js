const express = require("express");
const {
  handleBlogFetch,
  handleBlogCreation,
  handleBlogDetail,
  handleLiked,
} = require("../controllers/blog");
const router = express.Router();

router.get("/", handleBlogFetch);
router.get("/blogDetail/:blogId", handleBlogDetail);
router.post("/", handleBlogCreation);
router.post("/liked/:blogId", handleLiked);

module.exports = router;
