import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import EditList from "../components/EditList";

export default function MyBlogs() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [myBlog, setMyBlog] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchMyBlog = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/blog/myblog`, { withCredentials: true });
        if(res.status == 401 || res.data.message === "unauthorized")
          navigate("/login")
        else setMyBlog(res.data)
      } catch (error) {
        console.log("Error in fetching my blogs", error);
      }
    };

    fetchMyBlog();
  }, []);

  return myBlog ? (
    <div>
      <EditList blogs={myBlog} />
    </div>
  ) : (
    <h1>Create Data</h1>
  );
}
