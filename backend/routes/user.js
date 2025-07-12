const express = require("express")
const router = express.Router()
const {handleLogOut, handleLogin, handleSignUp, handleFetchUser} = require("../controllers/user")
const { restrictToLogInUserOnly } = require("../middleware/auth")

router.get("/" ,handleFetchUser)
router.post("/login", handleLogin)
router.post("/signup", handleSignUp)
router.post("/logout", handleLogOut)
module.exports = router;
