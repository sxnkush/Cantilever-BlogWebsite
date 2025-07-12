const jwt = require("jsonwebtoken");
const key = "Passthekey0";

function setUser(user) {
  try {
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      key
    );
    console.log("Token val", token)
    return token;
  } catch (err) {
    console.log("Error in token generation", err)
  }
}

function getUser(token){
    if(!token) return null;
    return jwt.verify(token, key);
}

module.exports = {setUser, getUser}
