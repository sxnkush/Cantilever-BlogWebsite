import axios from "axios";
import { useEffect, useState } from "react";
import BlogList from "../components/BlogList";
import {useNavigate} from "react-router-dom"

export default function Home() {
  const BASE_URL = import.meta.env.VITE_API_URL;

  const [connectionsBlog, setConnectionsBlog] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchConnectBlog = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/blog`, { withCredentials: true });
        if(res.status == 401 || res.data.message === "unauthorized")
          navigate("/login")
        else setConnectionsBlog(res.data)
      } catch (error) {
        console.log("Error in fetching connections blogs", error);
      }
    };

    fetchConnectBlog();
  }, []);

  return connectionsBlog ? (
    <div>
      <BlogList blogs={connectionsBlog} />
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
