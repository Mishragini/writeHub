import { useNavigate } from "react-router-dom";
import { AuthorCard } from "./AuthorCard";

export function FullBlog({ blog }: any) {
  const createdOnDate = new Date(blog.createdOn);
  const formattedCreatedOn = createdOnDate.toDateString();
  const navigate=useNavigate();
  return (
    <div className="m-8 grid grid-cols-1 lg:grid-cols-12">
      <div className="col-span-9">
        <div className="flex items-center">
        <div className="text-5xl font-extrabold">{blog.title}</div>
        <button onClick={()=>{
          const authorId=blog.authorId;
          navigate(`/author/${authorId}`)
        }}className="block lg:hidden bg-green-500 hover:bg-green-600 rounded-lg p-2 text-white ml-4"> About the Author</button>
        </div>
        <div className="mt-4  text-gray-400">Posted on . {formattedCreatedOn}</div>
        <div className="mt-4  text-gray-700">{blog.content}</div>
      </div>
      <div className="col span-3 hidden lg:block">
        <AuthorCard name={blog.author.name} about={blog.author.about} />
      </div>
      
    </div>
  );
}


