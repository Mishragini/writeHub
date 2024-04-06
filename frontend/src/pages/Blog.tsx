import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks";
import { Spinner } from "../components/Spinner";

export function Blog() {
    const { id } = useParams();
    const { blog, loading } = useBlog(id||''); 

    return (
        <>
            {!loading ? <FullBlog blog={blog} /> : 
        <div className="h-screen flex justify-center items-center"><Spinner/></div>}
        </>
    );
}
