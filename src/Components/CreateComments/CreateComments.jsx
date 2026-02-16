import { Form, Image, Input } from "@heroui/react";
import { useContext } from "react";
import { TokenCreatedContext } from "../../Context/TokenContext/TokenContext";
import AppButton from "../../Shared/AppButton/AppButton";
import { useForm } from "react-hook-form";
import { axiosInterceptors } from "../../Shared/AxiosInstance/AxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function CreateComments({id}) {
  const {userData} = useContext(TokenCreatedContext);

  const queryClient = useQueryClient();

  const {handleSubmit, register, reset} = useForm({
  defaultValues: {
    content: "",
  }
  })

  function createComment(data) {
    const myFormData = new FormData()
    myFormData.append('content', data.content)
    return axiosInterceptors.post(`posts/${id}/comments`, myFormData)
  }

  const {mutateAsync, isPending} = useMutation({
    mutationFn: createComment,
    onSuccess: function() {
      reset()
      queryClient.invalidateQueries({queryKey: ["allPosts"]})
    }
  })

  function hamada(data) {
    toast.promise(
      mutateAsync(data), {
        loading: "Comment Creating",
        success: function(response) {
          return response.data.message
        }
      }
    )
  }

  return (
    <>
    <>
     <Form onSubmit={handleSubmit(hamada)}  className="bg-gray-600/80 p-3 rounded-xl">
      <div className="w-full flex items-center gap-3">
        <Image
            alt="heroui logo"
            // height={40}
            radius="md"
            src={userData.photo}
            className="bg-gray-400 rounded-full w-9 h-9 border-2 border-blue-500"
          // width={40}
          />
          <Input type="text" {...register('content')} placeholder={`Write Your Comment ${userData.name}`}/>
      </div>
      <AppButton isLoading={isPending} color="primary" className="w-full mt-3" variant="shadow" type="submit">Submit</AppButton>
      </Form> 
    </>
    </>
  )
}
