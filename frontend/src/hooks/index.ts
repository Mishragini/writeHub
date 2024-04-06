import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export  function useUser() {
    const [user, setUser] = useState({
        name: "",
        about: "",
        posts: [
          {
            title: "",
            content: "",
            createdOn: "",
            id: ""
          }
        ]
      });
      
    const [loading, setLoading] = useState(true);

      async function fetchUserDetails() {
        try {
          const res = await axios.get(`${BACKEND_URL}/api/v1/me`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          });
          setUser(res.data);
          
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user details:", error);
          setLoading(false);
        }
      }
    
      useEffect(() => {
        fetchUserDetails();
      }, []);
    return {
        loading,
        user,
        setUser
    }
}

interface Blog {
  id: string;
  title: string;
  content: string;
  createdOn?: string;
  published?: string;
  authorId?: string;
  author?: {
    name: string;
    about: string;
  };
}

export function useBlog(id: string) {
  const [loading, setLoading] = useState<boolean>(true); 
  const [blog, setBlog] = useState<Blog>({
    id: "",
    title: "",
    content: "",
    createdOn:"",
    published:"",
    authorId:"",
    author: {
      name: "",
      about:""
    }
  });

  async function fetchBlog() {
    try {
      const response = await axios.get<Blog>(
        `${BACKEND_URL}/api/v1/blog/${id}`,
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
        }
      );
      setBlog(response.data);
      setLoading(false); 
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  }

  useEffect(() => {
    fetchBlog();
  }, []);
  return {
    loading,
    blog,
  };
}