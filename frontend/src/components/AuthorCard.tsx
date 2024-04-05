
export function AuthorCard({ name, about }: { name: string; about: string }) {
    return (
      <div className="ml-8">
        <div className="font-bold my-2">Author</div>
        <div className="flex items-center">
          <div className="mr-2 mt-4">
          <Circle/>
  
          </div>
          <div>
             <div className="text-3xl font-bold my-2">{name}</div>
  
              {about ? (
                <div>{about}</div>
              ) : (
                <div  className="flex  text-gray-500 whitespace-nowrap">No Description available.</div>
              )}
          </div>
          
        </div>
       
      </div>
    );
  }
  function Circle(){
    return(
        <div className="w-6 h-6 bg-slate-200 rounded-full "></div>
    )
}