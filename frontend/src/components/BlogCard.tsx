export function BlogCard({title,content,createdOn,id}:{title:string,content:string,createdOn:string,id:string}){
return(
    <div className="my-4">
        <div className="text-3xl font-semibold my-2">{title}</div>
        <div className="my-2 text-slate-500">Posted on {createdOn}</div>

        <div>{content} <a  className="text-blue-500 hover:text-blue-600"href={`/blog/${id}`}>Read More..</a></div>

    </div>
)
}