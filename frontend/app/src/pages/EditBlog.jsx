import { FaPen, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams, useNavigate } from "react-router-dom";

export default function EditBlog() {
  const { id } = useParams();
  const [titleEdit, setTitleEdit] = useState("");
  const [contentEdit, setContentEdit] = useState("");
  const [imageEdit, setImageEdit] = useState(null);
  const [imageURLEdit, setImageURLEdit] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/blog/blogDetail/${id}`, {
          withCredentials: true,
        });
        setTitleEdit(res.data.blog.title);
        setContentEdit(res.data.blog.content);
        setImageEdit(res.data.blog.image);
        setImageURLEdit(res.data.blog.image);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title: titleEdit,
      content: contentEdit,
      image: imageURLEdit,
    };
    const res = await axios.post(`${BASE_URL}/api/blog/edit/${id}`, formData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    if (res.status == 200) navigate("/myblog");
  };
  const BASE_URL = import.meta.env.VITE_API_URL;

  return (
    <div>
      <div className="mt-10 mb-16 sm:px-16 sm:py-5">
        <h1 className="text-3xl font-bold text-center">Edit Your Blog</h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-3/4 mx-auto mt-10 flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-xl font-semibold">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={titleEdit}
              placeholder="Enter Your Title"
              onChange={(e) => {
                setTitleEdit(e.target.value);
              }}
              className="border-2 border-gray-300 px-3 py-1 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="image" className="text-xl font-semibold">
              Upload Image
            </label>
            <input
              name="image"
              type="file"
              accept="image/*"
              alt=""
              className="border-2 border-gray-300 px-3 py-1 rounded-lg"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (file) {
                  setImageEdit(URL.createObjectURL(file)); //temp url just to preview
                  const formData = new FormData(); //to send post request we need to store file/image data in form type
                  formData.append("image", file);

                  try {
                    setUploadingImage(true);
                    const result = await axios.post(
                      `${BASE_URL}/api/upload`,
                      formData,
                      { withCredentials: true }
                    );
                    // console.log(result.data.imageUrl)
                    setImageURLEdit(result.data.imageUrl); //this will give uploaded image url of cloud
                    setUploadingImage(false);
                  } catch (error) {
                    console.log("Error in forntend image upload", error);
                  }
                }
              }}
            />
            {imageURLEdit ? (
              <button className="text-red-600 hover:cursor-pointer"
                onClick={() => {
                  setImageEdit(null);
                  setImageURLEdit(null);
                }}
              >
                <FaTrash />
              </button>
            ) : null}
            <p>
              {uploadingImage
                ? "Uploading Image"
                : imageURLEdit
                ? "Image uploaded"
                : ""}
            </p>
          </div>
          <img
          src={imageEdit}
          alt="Image Preview"
          className={`${imageEdit ? "block" : "hidden"} w-32 h-32`}
        />
          <ReactQuill value={contentEdit} onChange={(e) => setContentEdit(e)} />{" "}
          <button
            type="submit"
            className={`w-fit bg-blue-500 hover:bg-blue-600 transition-all text-white px-5 py-2  ${
              uploadingImage
                ? "hover:cursor-not-allowed"
                : "hover:cursor-pointer"
            }`}
          >
            Save Blog
          </button>
        </form>
      </div>
    </div>
  );
}
