import { useEffect, useState } from "react";
import { useUser } from "../hooks";
import { useNavigate , useLocation} from "react-router-dom";

export default function Appbar() {
  const location = useLocation();
  const [isSignedIn, setSignedIn] = useState(false);

  const { user } = useUser();
  const navigate = useNavigate();

  const hideAppbarRoutes = ['/signup', '/signin', '/'];

  const shouldHideAppbar = hideAppbarRoutes.includes(location.pathname);
  
  useEffect(() => {
    if (user.name) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }, [user]);

  return (
    <>
     {!shouldHideAppbar && <div className="flex justify-between p-6 border-b ">
      <a href="/blogs" className="text-3xl font-bold">
        Write<span className="text-blue-500">Hub</span>
      </a>
      <div className="flex">
        <button onClick={()=>{navigate('/myProfile')}}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="w-10 h-10 mr-2">
         <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
         </svg>
         </button>
        {isSignedIn ? (
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
