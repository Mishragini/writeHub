import { useEffect, useState } from "react";
import { useUser } from "../hooks";
import { useNavigate , useLocation, Link} from "react-router-dom";

export default function Appbar() {
  const location = useLocation();

  const { user } = useUser();
  const navigate = useNavigate();

  const hideAppbarRoutes = ['/signup', '/signin', '/'];

  const shouldHideAppbar = hideAppbarRoutes.includes(location.pathname);
  
  

  return (
    <>
     {!shouldHideAppbar && <div className="flex justify-between p-6 border-b ">
        
        <Link to={"/blogs"} className="text-3xl font-bold">
         Write<span className="text-blue-500">Hub</span>
        </Link>
      <div className="flex items-center">
        <button onClick={()=>{navigate('/publish')}}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mr-2">
           <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
         </svg>
         </button>
        <button onClick={()=>{navigate('/myProfile')}}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="w-10 h-10 mr-2">
         <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
         </svg>
         </button>
        {(user?.name) ? (
          <Button
            title="Logout"
            onClick={() => {
              localStorage.setItem("token", ""); 
              navigate('/signin')
            }}
          />
        ) : (
          <Button
            onClick={() => {
              navigate("/signin");
            }}
            title="Login" 
          />
        )}
      </div>
    </div>}
    </>
   
  );
}

export function Button({ title, onClick }: { title: string; onClick: React.MouseEventHandler<HTMLButtonElement> }) {
  return <button className="bg-black text-md text-white p-2 rounded-md" onClick={onClick}>{title}</button>;
}
