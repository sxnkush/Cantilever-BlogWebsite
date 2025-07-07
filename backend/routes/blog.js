const express = require("express")
const router = express.Router()

router.get("/", handleBlogFetch)
router.post("/", handleBlogCreation)
router.get("")