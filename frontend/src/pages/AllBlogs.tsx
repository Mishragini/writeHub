import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";
import { BlogCard } from "../components/BlogCard";
import { Spinner } from "../components/Spinner";

export function AllBlogs() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([
    {
      title: "",
      content: "",
      createdOn: "",
      id: ""
    }
  ]);

  async function fetchBlogs() {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blogs`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem("token") }
      });
      setBlogs(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="m-20">
      {!loading ? (
        blogs.map((blog) => {
          const createdOnDate = new Date(blog.createdOn);
          const formattedCreatedOn = createdOnDate.toDateString();
          return (
            <BlogCard
              key={blog.id} 
              title={blog.title}
              content={blog.content.slice(0,200)}
              createdOn={formattedCreatedOn}
              id={blog.id}
            />
            
          );
        })
      ) : (
        <div className="h-screen flex justify-center items-center"><Spinner/></div>
      )}
    </div>
  );
}
