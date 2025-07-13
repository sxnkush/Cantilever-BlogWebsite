import { FaPen, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function EditCard({ title, excerpt, image, id, author, date, content }) {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate()
  return(
    <div
      className={`${
        deleted ? "hidden" : "block"
      } rounded-2xl border border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden`}
    >
      <div className="relative">
        <img
          src={image}
          className="w-full h-48 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-500"
          alt={title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl"></div>
      </div>

      <div className="relative p-4 flex flex-col gap-3 bg-white">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p
          className="text-gray-700 text-sm"
          dangerouslySetInnerHTML={{ __html: excerpt + "..." }}
        ></p>
        <p className="text-xs text-gray-500">
          By {author} on {date}
        </p>
        <Link
          to={`/blog/${id}`}
          className="inline-block w-max px-4 py-2 mt-2 text-sm font-medium border border-black text-white bg-black rounded hover:bg-white hover:text-black transition-all duration-200"
        >
          Read more →
        </Link>
        <span className="flex gap-4 mt-2">
          <button
            className="flex items-center gap-2 px-3 py-1 rounded-md border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-200 hover:cursor-pointer"
            onClick={() => navigate(`/editblog/${id}`)}
          >
            <FaPen />
            Edit
          </button>
          <button
            className="flex items-center gap-2 px-3 py-1 rounded-md border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200 hover:cursor-pointer"
            onClick={async () => {
              try {
                const res = await axios.delete(`${BASE_URL}/api/blog/${id}`, {
                  withCredentials: true,
                });
                setDeleted(true);
                console.log("Blog Deleted", res);
              } catch (error) {
                console.log("Error in deletion of blog", error);
              }
            }}
          >
            <FaTrash />
            Delete
          </button>
        </span>
      </div>
    </div>
  );
}
