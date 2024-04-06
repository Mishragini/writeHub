import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";
import { BlogCard } from "../components/BlogCard";
import { useUser } from "../hooks";
import { Spinner } from "../components/Spinner";

export function AccountProfile() {
  const { user, loading, setUser } = useUser();

  const [putInputs, setPutInputs] = useState({
    name: "",
    about: ""
  });

  useEffect(() => {
    setPutInputs({
      name: user.name,
      about: user.about
    });
  }, [user]);

  async function updateUserDetails() {
    try {
      await axios.put(
        `${BACKEND_URL}/api/v1/me`,
        {
          name: putInputs.name,
          about: putInputs.about
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );
      setUser({
        ...user,
        name: putInputs.name,
        about: putInputs.about
      });
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  }

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen"><Spinner/></div>
      ) : (
        <div>
          <div className="mx-64 my-10">
            <div className="flex flex-col items-start">
              <input
                type="text"
                value={putInputs.name}
                onChange={(e) =>
                  setPutInputs({ ...putInputs, name: e.target.value })
                }
                className="text-5xl font-bold my-4 bg-transparent"
              />
              {user.about ? (
                <input
                  type="text"
                  value={putInputs.about}
                  onChange={(e) =>
                    setPutInputs({ ...putInputs, about: e.target.value })
                  }
                  className="w-full bg-transparent"
                />
              ) : (
                <input
                  type="text"
                  placeholder="No Description available."
                  value={putInputs.about}
                  onChange={(e) =>
                    setPutInputs({ ...putInputs, about: e.target.value })
                  }
                  className="w-full bg-transparent"
                />
              )}
            </div>

            <button
              onClick={updateUserDetails}
              className="p-2 bg-green-500 mt-2 rounded-lg text-white hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
          <div className="mx-48 my-4">
            {user.posts.map((post) => {
              const createdOnDate = new Date(post.createdOn);
              const formattedCreatedOn = createdOnDate.toDateString();
              return (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  content={post.content.slice(0, 200)}
                  createdOn={formattedCreatedOn}
                  id={post.id}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
