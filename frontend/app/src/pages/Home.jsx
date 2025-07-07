import axios from "axios";
import { useEffect, useState } from "react";
import BlogList from "../components/BlogList";

export default function Home() {
  const [connectionsBlog, setConnectionsBlog] = useState(null);
  useEffect(() => {
    const fetchConnectBlog = async () => {
      try {
        const res = await axios.get(`/api/blog`, { withCredentials: true });
        if (res.data) setConnectionsBlog(res.data);
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
