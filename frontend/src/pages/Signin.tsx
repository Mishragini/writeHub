import GrayCard from "../components/GrayCard";
import { AuthCard } from "../components/AuthCard";

export function Signin(){
    return(
        <div className="grid grid-cols-1 lg:grid-cols-2">
        <AuthCard type="signin"/>
        <div className="hidden lg:block">
        <GrayCard />
        </div>
        </div>
    )
}