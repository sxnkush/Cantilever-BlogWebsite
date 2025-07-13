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
const cloudinary = require("./services/cloudinary")
const upload = require("./services/multer")

connectMongoose(
  process.env.MONGO_URI
).then(() => console.log("Mongoose Connected"));

app.use(
  cors({
    origin: ["http://localhost:5173", "https://cantilever-blogwebsite.onrender.com"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/blog", restrictToLogInUserOnly, blogRoute);
app.use("/api/user", checkAuth, userRoute)
app.post("/api/upload", restrictToLogInUserOnly, upload.single("image"), async(req,res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path)
    return res.json({
      imageUrl: result.secure_url,
      public_id: result.public_id
    })
  } catch (error) {
    return res.status(500).json({mesage: "Image Upload Failed"})
  }
})

app.listen(PORT, () => console.log("Server Started"));
