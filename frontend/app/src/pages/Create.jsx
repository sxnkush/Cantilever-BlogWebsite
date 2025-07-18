import axios from "axios";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const BASE_URL = import.meta.env.VITE_API_URL;

  //backend main author ka data apne aap dal jayega(us hisaab se setup krna hai)
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title: title,
      content: content,
      image: imageURL,
    };
    const res = await axios.post(`${BASE_URL}/api/blog`, formData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    if (res.status == 200) navigate("/");
  };
  return (
    <div className="mt-10 mb-16 sm:px-16 sm:py-5">
      <h1 className="text-3xl font-bold text-center">Create Your Blog</h1>
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
            value={title}
            placeholder="Enter Your Title"
            onChange={(e) => {
              setTitle(e.target.value);
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
                setImage(URL.createObjectURL(file)); //temp url just to preview
                const formData = new FormData(); //to send post request we need to store file/image data in form type
                formData.append("image", file);

                try {
                  const result = await axios.post(
                    `${BASE_URL}/api/upload`,
                    formData,
                    { withCredentials: true }
                  );
                  console.log("image", result.data.imageUrl);
                  setImageURL(result.data.imageUrl); //this will give uploaded image url of cloud
                } catch (error) {
                  console.log("Error in forntend image upload", error);
                }
              }
            }}
          />
          {imageURL ? (
            <button
              className="text-red-600 hover:cursor-pointer"
              onClick={() => {
                setImage("");
                setImageURL("");
              }}
            >
              <FaTrash />
            </button>
          ) : null}
          <p>
            {imageURL ? "Image uploaded" : (image ? "Uploading Image" : "")}
          </p>
        </div>
        <img
          src={image}
          alt="Image Preview"
          className={`${image ? "block" : "hidden"} w-32 h-32`}
        />
        <ReactQuill value={content} onChange={(e) => setContent(e)} />{" "}
        {/*directly set setContent since reactquill returns a HTML collection or data so no need to use e.target.value*/}
        <button
          type="submit"
          className={`w-fit bg-blue-500 hover:bg-blue-600 transition-all text-white px-5 py-2 ${
            imageURL ? "hover:cursor-pointer" : "hover:cursor-not-allowed"
          }`}
        >
          Post Blog
        </button>
      </form>
    </div>
  );
}
