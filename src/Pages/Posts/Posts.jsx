import axios from "axios";
import { useEffect, useState } from "react";
import PostDetails from "../../Components/PostDetails/PostDetails";
import Loading from "../../Components/Loading/LoadingScreen";

export default function Posts() {

  const [allPosts, setAllPosts] = useState(null);

  async function getAllPosts() {
    try {
      const {data:{posts}} = await axios.get(`${import.meta.env.VITE_BASE_URL}posts?limit=50`, {
      headers: {

        token: localStorage.getItem('token')
      }
    })

    setAllPosts(posts);

    console.log(posts)

    }
    catch(error) {
      console.log(error.response)
    }

  }

  useEffect(function() {
    getAllPosts();
  }, [])

  return (
    <>

    {allPosts ?  <div className="w-150 mx-auto mt-4 flex flex-col gap-4">
      
    {allPosts.map(function(e) {return <PostDetails key={e._id} post={e}/>})}
    </div> : <Loading/>  } 
    </>
  )
}
