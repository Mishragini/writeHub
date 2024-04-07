import { useNavigate } from "react-router-dom";
import { Button } from "../components/Appbar";
import { useUser } from "../hooks";
import { Spinner } from "../components/Spinner";

export function Landing() {
    const { user,loading } = useUser();
    const navigate = useNavigate();

    return (<>
    {(loading)?
    <div className="h-screen flex justify-center items-center">
        <Spinner/>
    </div>
    :<div className="h-screen flex flex-col items-center justify-center">
            <div className="text-5xl font-bold">{(!user?.name) ? "Welcome to WriteHub" : "Welcome Back!!"}</div>
            <p className="text-xl text-gray-400 mt-2 mb-4">Read the latest insights on the subjects that interest you!!!</p>
            {(user?.name)?(
                <Button title="Resume Browsing" onClick={() => { navigate('/blogs') }} />
            ) : (
                <Button title="Signup" onClick={() => { navigate('/signup') }} />
            )}
        </div>}
    </>
        
    );
}
