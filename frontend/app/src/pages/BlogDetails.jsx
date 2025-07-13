import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaHeart } from "react-icons/fa";

export default function BlogDetails() {
  const BASE_URL = import.meta.env.VITE_API_URL;

  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/blog/blogDetail/${id}`, {
          withCredentials: true,
        });
        setBlog(res.data.blog);

        const requestedBy = res.data.requestedBy;
        console.log(res.data.blog);
        if (res.data.blog.likedBy)
          setLiked(res.data.blog.likedBy.includes(requestedBy));
        setLikeCount(res.data.blog.likedBy.length);
      } catch (err) {
        //navigate krna hai agr login par, toh catch mai condition check karo, kyuki get req par backend se status 401 aayega jo ki error dega or try se bahar aa jayenge phir catch mai aayenge
        if (
          err.response?.status === 401 ||
          err.response?.data?.message === "unauthorized"
        ) {
          navigate("/login");
        } else {
          console.log("Error in fetching Blog Details", err);
        }
      }
    };

    fetchBlogDetails();
  }, [id]);

  return blog ? (
    <div className="relative max-w-3xl mx-auto p-4 mb-16 mt-5">
      <button className="absolute top-0 -left-10 hover:cursor-pointer" onClick={() => navigate("/")}>
        <FaArrowLeft />
      </button>
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-gray-500">
        By {blog.author} on {blog.publishedDate.toString().split('T')[0]}
      </p>
      <img src={blog.image} className="w-full h-64 object-cover my-4" />
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
      <button
        onClick={() => {
          axios.post(
            `${BASE_URL}/api/blog/liked/${id}`,
            {},
            { withCredentials: true }
          ); //agr already liked hai toh remove from likedBy, nahi toh append in likedBy
          setLiked((prev) => !prev);
          setLikeCount((prev) => prev + 1);
        }}
      >
        <FaHeart
          className={`${liked ? "text-red-600" : "text-white"} border-black`}
          style={{
            stroke: "black",
            strokeWidth: "50px",
          }}
        />
        {likeCount}
      </button>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
