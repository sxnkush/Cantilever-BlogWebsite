const express = require("express");
const app = express();

const cors = require("cores");
const PORT = 8001;
const { connectMongoose } = require("./connection");

const cookieParser = require("cookie-parser");

connectMongoose(
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.4.2"
).then(() => console.log("Mongoose Connected"));

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.listen(PORT, () => console.log("Server Started"));
