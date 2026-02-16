import { Card, CardBody, CardHeader, Divider, Form, Image, Input } from '@heroui/react';
import { DocumentUpload } from 'iconsax-reactjs';
import AppButton from '../../Shared/AppButton/AppButton';
import { useContext, useRef, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { TokenCreatedContext } from '../../Context/TokenContext/TokenContext';
import { useQueryClient } from '@tanstack/react-query';


export default function CreatePost() {
  
  const [userUploadImage, setUserUploadImage] = useState(null);

  const {userData} = useContext(TokenCreatedContext)

  const uploadImage = useRef();

  const [image, setImage] = useState(null);

  function handleImageUpload(e) {
    setImage(e.target.files[0]);
    setUserUploadImage(URL.createObjectURL(e.target.files[0]))
  }

  const { handleSubmit, register,reset } = useForm({
    defaultValues: {
      body: "",
    }
  })


  const queryClient = useQueryClient()


  function handleUserCreatePost(data) {
    const formDataImage = new FormData();
    formDataImage.append('body', data.body)
    if(image)formDataImage.append('image', image)
    toast.promise(axios.post(`${import.meta.env.VITE_BASE_URL}posts`, formDataImage, {
        headers: {
            token: localStorage.getItem('token')
        }
    }), {
        loading: "Save Post",
        success: function(msgs) {
            reset()
        setImage(null);
        setUserUploadImage(null);
        queryClient.invalidateQueries({queryKey: ["allPosts"]})
        console.log(queryClient.invalidateQueries({queryKey: "allPosts"}))
        return msgs.data.message
        },
        error: function({response:{data:{error}}}) {
            setImage(null);
        setUserUploadImage(null);
        return error
        }
    })
   
  }

  
  return (
    <Card className="bg-gray-100/20 border-2 border-white">
      <CardHeader className="flex gap-3">
        {/* What in Your Mind {userData?.name} */}
      </CardHeader>
      <Divider />
      <CardBody>
        <div className=" flex gap-3">
          <Image
            alt="heroui logo"
            // height={40}
            radius="md"
            src={userData.photo}
            className="bg-gray-400 rounded-full w-9 h-9 border-2 border-blue-500"
          // width={40}
          />
          <Form className="grow " onSubmit={handleSubmit(handleUserCreatePost)}>
            <div className=" w-full flex items-center gap-3">
              <Input
              isRequired
                {...register("body")}
                placeholder={`What in Your Mind ${userData?.name}`}
                type="text"
              />
              
        <input
          type="file"
          className="hidden"
          ref={uploadImage}
          onChange={handleImageUpload}
        />
              <DocumentUpload
                size="32"
                className="text-blue-500 cursor-pointer"
                onClick={function () {
                  uploadImage.current.click();
                }}
              />
            </div>
            <div>
              <img src={userUploadImage} className="w-full rounded-4xl" alt="" />
            </div>
            <div className="w-full">
              <AppButton
                className="w-full"
                color="primary"
                variant="shadow"
                type="submit"
              >
                Create Post
              </AppButton>
            </div>
          </Form>
        </div>

      </CardBody>
    </Card>
  )
}
