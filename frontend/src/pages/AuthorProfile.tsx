import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { BlogCard } from "../components/BlogCard";
import { Spinner } from "../components/Spinner";

export function AuthorProfile() {
  const [loading, setLoading] = useState(true); 
  const { authorId } = useParams();
  const [author, setAuthor] = useState({
    name: "",
    about: "",
    posts: [
      {
        title: "",
        content: "",
        createdOn: "",
        id:""
      }
    ]
  });

  async function fetchAuthorDetails() {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/author/${authorId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      setAuthor(res.data);
      setLoading(false); 
    } catch (error) {
      console.error("Error fetching author details:", error);
      setLoading(false); 
    }
  }

  useEffect(() => {
    fetchAuthorDetails();
  }, []); 

  return (
    <>
      {loading ? (
        <div className="h-screen flex justify-center items-center"><Spinner/></div>
        
      ) : (
        <div>
          <div className="mx-64 my-10">
            <div className="text-5xl font-bold my-4">{author.name}</div>
            {author.about ? (
              <div>{author.about}</div>
            ) : (
              <div className="flex  text-gray-500 whitespace-nowrap">
                No Description available.
              </div>
            )}
          </div>
          <div className="mx-48 my-4">
            {author.posts.map((post) => {
              const createdOnDate = new Date(post.createdOn);
              const formattedCreatedOn = createdOnDate.toDateString();
              return (
                <BlogCard
                 key={post.id}
                  title={post.title}
                  content={post.content.slice(0,200)}
                  createdOn={formattedCreatedOn}
                  id={post.id}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
