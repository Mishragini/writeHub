import { useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export function AddBlog() {
    const[title,setTitle]=useState("");
    const[description,setDescription]=useState("");
    
    const navigate=useNavigate();

    async function handleBlogPost(){
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {title,content:description},
            {
                headers:{
                    Authorization:'Bearer '+localStorage.getItem("token")
                }
            });
            navigate(`/blog/${response.data.id}`)
                       
        } catch (e) {
            alert("Error while signing up");
        }
    }
    
    return (
        <div className="m-10">
            <div className="mb-6">
              <label  className="block mb-2 text-md font-medium text-gray-900">Title</label>
              <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e)=>{setTitle(e.target.value)}}/>
            </div>
            <label  className="block mb-2 text-md font-medium text-gray-900">Your Blog</label>
            <textarea id="message" rows={8} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "placeholder="Write your thoughts here..." onChange={(e)=>{setDescription(e.target.value)}}></textarea>
            <button onClick={handleBlogPost}type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-4">Publish</button>
        </div>
    );
}
