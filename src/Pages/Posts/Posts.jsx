import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import PostCard from "../../Components/PostCard/PostCard";
import Loading from "../../Components/Loading/LoadingScreen";
import { TokenCreatedContext } from "../../Context/TokenContext/TokenContext";
import CreatePost from "../../Components/CreatePost/CreatePost";

export default function Posts() {
  const [allPosts, setAllPosts] = useState(null);

  const { userData } = useContext(TokenCreatedContext);

  

  async function getAllPosts() {
    try {
      const {
        data: { posts },
      } = await axios.get(`${import.meta.env.VITE_BASE_URL}posts?limit=50`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setAllPosts(posts);
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(function () {
    getAllPosts();
  }, []);

  

  return (
    <>
      {allPosts ? (
        <div className="max-w-3xl mx-5 sm:mx-auto  mt-4 flex flex-col gap-4">
          <CreatePost userData={userData}/>
          {allPosts.map(function (e) {
            return <PostCard key={e._id} post={e} />;
          })}
          
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
