const express = require("express");
const app = express();
const dotenv = require("dotenv")
dotenv.config()

const cors = require("cors");
const PORT = process.env.PORT || 8001;
const { connectMongoose } = require("./connection");

const blogRoute = require("./routes/blog");
const userRoute = require("./routes/user");
const {restrictToLogInUserOnly, checkAuth} = require("./middleware/auth");

const cookieParser = require("cookie-parser");

connectMongoose(
  process.env.MONGO_URI
).then(() => console.log("Mongoose Connected"));

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/blog", restrictToLogInUserOnly, blogRoute);
app.use("/api/user", checkAuth, userRoute)

app.listen(PORT, () => console.log("Server Started"));
