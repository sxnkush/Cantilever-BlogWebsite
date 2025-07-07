import { useEffect, useState } from "react";
import useParams, { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart } from "react-icons/fa";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const res = await axios.get(`/api/blog/${id}`, { withCredentials: true }); //jab is get request to return karna to uske saath requestBy user ki bhi id dena object ki form mai
        if (res.data.message == "not found") navigate("/login");
        else setBlog(res.data);

        const requestedBy = res.data.requestedBy;
        setLiked(res.data.likedBy.includes(requestedBy));
      } catch (err) {
        console.log("Error in fetching Blog Details", err);
      }
    };

    fetchBlogDetails();
  }, [id]);

  return blog ? (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-gray-500">
        By {blog.author} on {blog.date}
      </p>
      <img src={blog.image} className="w-full h-64 object-cover my-4" />
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
      <button onClick={() => {
        axios.patch(`api/blog/liked/${id}`, {withCredentials: true});
        setLiked((prev) => !prev);
      }}>
        <FaHeart
        className={`${
          liked ? "text-red-600 border-red-600" : "text-white border-black"
        }`}
      />
      </button>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
