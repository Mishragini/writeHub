import { Link } from "react-router-dom";

export function BlogCard({title,content,createdOn,id}:{title:string,content:string,createdOn:string,id:string}){
return(
    <div className="my-4">
        <div className="text-3xl font-semibold my-2">{title}</div>
        <div className="my-2 text-slate-500">Posted on {createdOn}</div>

        <div>{content} 
        <Link to={`/blog/${id}`} className="text-blue-500 hover:text-blue-600 ml-2">
        Read More..
        </Link>
        </div>

    </div>
)
}