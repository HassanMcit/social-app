import { useQuery } from "@tanstack/react-query";
import { axiosInterceptors } from "../../Shared/AxiosInstance/AxiosInstance";
import Skeleton from "react-loading-skeleton";

export default function usePostDetails(id) {
    // console.log(id)
    function getSinglePost() {
      return axiosInterceptors.get(`posts/${id}`)
    }

    const {data, isError, isLoading, error} = useQuery({
      queryKey: ["postDetails",id],
      queryFn: getSinglePost,
      select: (data) => data.data.data.post
    });

    function getAllPostComments() {
      return axiosInterceptors.get(`posts/${id}/comments?page=1&limit=10`)      
    }

    const {data:commentData, isError:commentError, isLoading:commentLoading, error:commentEror} = useQuery({
      queryKey: ["comment", id],
      queryFn: getAllPostComments
    })



    
  return {
    data, isError, isLoading, error, commentLoading,commentError, commentData
  }
}
