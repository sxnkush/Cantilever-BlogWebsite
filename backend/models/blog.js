const mongoose = require("mongoose");
const blogSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: false,
      ref: "User"
    },
    author:{
        type: String,
        required: true,
        unique: false,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    publishedDate: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    likedBy: {
      type: [String],
      ref: "User",
      default: []
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("blogs", blogSchema);

module.exports = Blog;
