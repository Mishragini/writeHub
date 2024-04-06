import { Icon } from 'react-icons-kit'; 
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { signupType, signinType } from '@mishri/common';

export function AuthCard({ type }: { type: "signup" | "signin" }) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [postInputs, setPostInputs] = useState<signupType | signinType>(type === "signup" ? {
        name: "",
        email: "",
        password: ""
    } : {
        email: "",
        password: ""
    });

    async function sendReq() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${(type==="signup"?"signup":"signin")}`, postInputs);
            console.log(response);
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (e) {
            alert("Error while signing up");
        }
    }

    const handleToggle = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <p className="text-2xl font-bold">{(type === "signup") ? "Create an account" : "Enter your credentials"}</p>
            <p className="text-sm text-gray-400 mb-8 pt-2">{(type === "signup") ? "Already have an account?" : "Don't have an account?"} <a href={(type === "signup") ? "/signin" : "/signup"} className="underline underline-offset-4">{type === "signin" ? "Sign up" : "Login"}</a></p>
            <div className="flex flex-col items-start">
                {type === "signup" && (
                    <>
                        <div className="text-base font-semibold">Username</div>
                        <input type="text" className="border-2 border-gray-200 mt-2 rounded-md  p-2 w-64" placeholder="Enter your username" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                name: e.target.value
                            });
                        }} />
                    </>
                )}

                <div className="text-base font-semibold mt-2">Email </div>
                <input type="text" className="border-2 border-gray-200 mt-2 rounded-md  p-2 w-64" placeholder="m@example.com" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        email: e.target.value
                    });
                }} />

                <div className="text-base font-semibold mt-2">Password </div>
                <div className='flex items-center relative'>
                    <input type={`${(showPassword) ? "text" : "password"}`} className="border-2 border-gray-200 mt-2 rounded-md p-2 w-64" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        });
                    }} />
                    <span className="absolute right-0 top-0 bottom-0 flex items-center pr-2 hover:cursor-pointer" onClick={handleToggle}>
                        <Icon icon={showPassword ? eye : eyeOff} size={20} />
                    </span>
                </div>

                
                    <button onClick={sendReq
                    } type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium w-64 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-3 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                        {(type==="signup")?"Sign Up":"Sign in"}
                    </button>
                

            </div>
        </div>
    );
}
