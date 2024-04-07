import { useNavigate } from "react-router-dom";
import { AuthorCard } from "./AuthorCard";
import { useUser } from "../hooks";
import { Fragment, useEffect, useState } from "react";

export function FullBlog({ blog }: any) {
  const { user } = useUser();
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    
    user.posts.map((post) => {
      if (post.id === blog.id) {
        setIsOwner(true);
      }
    });
  }, [user]);

  const createdOnDate = new Date(blog.createdOn);
  const formattedCreatedOn = createdOnDate.toDateString();
  const paragraphs = blog.content.split(/\n/);
  const contentWithLineBreaks = paragraphs.map((paragraph:string) => (
    <Fragment >
    {paragraph}
    <br />
  </Fragment>
  ));

  const navigate = useNavigate();

  return (
    <div className="m-8 grid grid-cols-1 lg:grid-cols-12">
      <div className="col-span-9">
        <div className="flex items-center">
          <div className="text-5xl font-extrabold">{blog.title}</div>
          <button
            onClick={() => {
              const authorId = blog.authorId;
              navigate(`/author/${authorId}`);
            }}
            className="block lg:hidden bg-green-500 hover:bg-green-600 rounded-lg p-2 text-white ml-4"
          >
            {" "}
            About the Author
          </button>
        </div>
        <div className="mt-4 text-gray-400">Posted on . {formattedCreatedOn}</div>
        <div className="mt-4 text-gray-700">{contentWithLineBreaks}</div>
        {isOwner && (
          <button
            className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg mt-2"
            onClick={() => {
              navigate(`/edit/${blog.id}`);
            }}
          >
            Edit
          </button>
        )}
      </div>
      <div className="col span-3 hidden lg:block">
        <AuthorCard name={blog.author.name} about={blog.author.about} />
      </div>
    </div>
  );
}
