import axios from "axios";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Create() {
  //backend main author ka data apne aap dal jayega(us hisaab se setup krna hai)
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDate(new Date().toISOString().split("T")[0]);
    const formData = {
      title: title,
      content: content,
      image: image,
      publishedDate: date,
    };
    const res = await axios.post(`/api/blog`, formData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  };
  return (
    <div>
      <h1>Create Your Blog</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="file"
          accept="image/*"
          alt=""
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) setImage(URL.createObjectURL(file));
          }}
        />
        <img src={image} alt="Image Preview" className="w-32 h-32" />
        {/* yaha par text editor aayega aur abhi iamge ko store krne ka setUp rhta hai*/}
        <ReactQuill value={content} onChange={(e) => setContent(e)} />{" "}
        {/*directly set setContent since reactquill returns a HTML collection or data so no need to use e.target.value*/}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
