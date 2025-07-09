const User = require("../models/user");
const { setUser } = require("../services/auth");

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
    secure: true,
    sameSite: "Lax",
    maxAge: (60 * 60 * 1000) / 6,
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
    secure: true,
    sameSite: "Lax",
  });
  return res.json({ message: "Logged Out" });
}

async function handleFetchUser(req, res)
{   
    const user = req.user

    //agr user logged in nahi hai toh, mtlb agr is route par direct request aata hai to handle that=>
    if(!user) return res.status(401).json({message:"unauthorized"})

    return res.status(200).json(user)
}

module.exports = { handleLogOut, handleLogin, handleSignUp, handleFetchUser };
