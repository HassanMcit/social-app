import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useParams } from "react-router"
import Loading from "../../Components/Loading/LoadingScreen"
import PostCard from "../../Components/PostCard/PostCard"
import Skeleton from "react-loading-skeleton"
import { axiosInterceptors } from "../../Shared/AxiosInstance/AxiosInstance"
import usePostDetails from "../../Hooks/usePostDetails.jsx/usePostDetails"

export default function PostDetails() {
    const {id} = useParams()
    
    const {data, commentData, isLoading, commentLoading, isError, commentEror, error} = usePostDetails(id)

    if(isLoading || commentLoading) {
      return <div className="max-w-3xl mx-5 sm:mx-auto  mt-4">

        <Skeleton className="h-200"/>
      </div>
    }

    if(isError || commentEror) {
      console.log(error)
      return <h1>get out of here</h1>
    }

  return (
    <>
    <div className="max-w-2xl mx-auto">
      <PostCard post={data}  comment={commentData?.data.data.comments}/>
    </div>
    </>
  )
}
