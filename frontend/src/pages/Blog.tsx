import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { FullBlog } from "../components/FullBlog";

export function Blog() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [blog, setBlog] = useState({});

    async function fetchBlog() {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers: { Authorization: 'Bearer ' + localStorage.getItem("token") }
            });
            setBlog(response.data);
            setLoading(true);
        } catch (error) {
            console.error("Error fetching blog:", error);
        }
    }

    useEffect(() => {
        fetchBlog();
    }, []);

    return (
        <>
            {loading ? <FullBlog blog={blog} /> : <div>Loading</div>}
        </>
    );
}
