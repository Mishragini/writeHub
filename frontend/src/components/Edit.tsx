import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../hooks";


export function Edit(){
    const {id}=useParams()
    const [putInputs,setPutInputs]=useState({title:"",content:""})
    const{blog}=useBlog(id||'');

    const navigate=useNavigate();
    useEffect(()=>{
        setPutInputs(
            {
                title:blog.title,
                content:blog.content
            }
        )
    },[blog])
    async function handleBlogPut() {
        try {
             await axios.put(
                `${BACKEND_URL}/api/v1/blog/${id}`,
                putInputs,  
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            navigate(`/blog/${id}`);
        } catch (error) {
            console.error("Error updating blog:", error);
        }
    }
    
    return (
        <div className="m-10">
            <div className="mb-6">
              <label  className="block mb-2 text-md font-medium text-gray-900">Title</label>
              <input value={putInputs.title} type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e)=>{setPutInputs({...putInputs,title:e.target.value})}}/>
            </div>
            <label  className="block mb-2 text-md font-medium text-gray-900">Your Blog</label>
            <textarea id="message" rows={8} value={putInputs.content} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "placeholder="Write your thoughts here..." onChange={(e)=>{setPutInputs({...putInputs,content:e.target.value})}}></textarea>
            <button onClick={handleBlogPut}type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-4">Publish</button>
        </div>
    );
}