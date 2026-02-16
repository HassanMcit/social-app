import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import PostCard from "../../Components/PostCard/PostCard";
import { TokenCreatedContext } from "../../Context/TokenContext/TokenContext";
import CreatePost from "../../Components/CreatePost/CreatePost";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";

export default function Posts() {

  const { userData } = useContext(TokenCreatedContext);

  async function getAllPosts() {
    // try {
    //   const {
    //     data: { posts },
    //   } = await axios.get(`${import.meta.env.VITE_BASE_URL}posts?limit=50`, {
    //     headers: {
    //       token: localStorage.getItem("token"),
    //     },
    //   });

    //   setAllPosts(posts);
    // } catch (error) {
    //   console.log(error.response);
    // }
    return axios.get(`${import.meta.env.VITE_BASE_URL}posts`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
  }

  // useEffect(function () {
  //   getAllPosts();
  // }, []);


  const {data, isLoading, isError, refetch, error} = useQuery({
    queryKey: ['allPosts'],
    queryFn: getAllPosts,
    // staleTime: 100000,
    // gcTime: 100,
    // refetchInterval: 500
    refetchOnMount: false,
    select: data => data.data.data.posts,
    enabled: true
  })

  
  
  if(isLoading) {
    return <div className="max-w-3xl mx-5 sm:mx-auto  mt-4 flex flex-col gap-4 ">
      <Skeleton className="h-40"/>
       <Skeleton  className="h-80" count={50}/>
    </div>
  }
  
  if(isError)
    {
      console.log(error.response.data.error)
      return <h1>Error Happen</h1>
    }  
    // console.log(data.data.data.posts)

//  const {data:{posts}} = data

  return (
    <>
      { <div className="max-w-3xl mx-5 sm:mx-auto  mt-4 flex flex-col gap-4">
          <CreatePost userData={userData}/>
          {data?.map(function (e) {
            return <PostCard key={e._id} post={e} />;
          })}
          {/* {console.log(data[0])} */}
        </div>}
    </>
  );
}
