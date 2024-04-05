import { useEffect, useState } from "react"

export default function Appbar(){
    const [isSignedIn,setSignedIn]=useState(false);

    useEffect(()=>{
        
    })

    return (
        <div className="flex justify-between">
            <div className="text-xl font-bold">
                Write<span className="text-blue-400">Hub</span>
            </div>
            <div className="">

            </div>
        </div>
    )
}