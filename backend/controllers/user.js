const User = require("../models/user");
const { setUser } = require("../services/auth");
const dotenv  = require("dotenv")
dotenv.config()

async function handleLogin(req, res) {
  //to check whether user is already logged in or not
  if (req.user)
    return res.status(200).json({ message: "User Already Logged in" });

  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user) return res.status(401).json({ message: "User not found" });

  const token = setUser(user);
  res.cookie("uid", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production"? "None":"Lax",
    maxAge: 24 * (60 * 60 * 1000) / 6,
  });

  console.log("User Logged In ", user);
  return res.status(200).json({ message: "Log In success" });
}

async function handleSignUp(req, res) {
  const user = req.body;
  await User.create({
    name: user.name,
    email: user.email,
    password: user.password,
  });

  console.log("User Created", user);
  return res.status(201).json({ message: "Sign Up success" });
}

async function handleLogOut(req, res) {
  console.log("Logging out...", req.user);
  res.clearCookie("uid", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production"? "None":"Lax",
  });
  return res.json({ message: "Logged Out" });
}

async function handleFetchUser(req, res)
{   
    //agr user logged in nahi hai then this must return 401 i.e. user is not logged since is par hum checkAuth middleware use kar rahe hai
    if(!req.user) return res.status(401).json({message:"unauthorized"})
    const user = await User.findById(req.user._id)

    //agr user logged in nahi hai toh, mtlb agr is route par direct request aata hai without user logIn to handle that=>
    if(!user) return res.status(401).json({message:"unauthorized"})

    return res.status(200).json(user)
}

module.exports = { handleLogOut, handleLogin, handleSignUp, handleFetchUser };
