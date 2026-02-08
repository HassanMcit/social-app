import { Card, CardBody, CardFooter, CardHeader, Divider, Image } from '@heroui/react'
import { Like1, MessageText, Send2 } from 'iconsax-reactjs'
import React from 'react'

export default function PostDetails({post}) {
    const {user:{name, photo},body, image} = post
  return (
    <Card >
      <CardHeader className="flex gap-3">
        <Image
          alt="heroui logo"
          height={40}
          radius="md"
          src={photo}
          className='bg-gray-400 rounded-full'
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md font-semibold capitalize">{name}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col items-center">
        <p>{body}</p>
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={!!image &&  image }
          // width={270}
        />
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-between">
        <Like1 className="cursor-pointer" size="32" color="#000"/>
        <MessageText className="cursor-pointer" size="32" color="#000"/>
        <Send2 className="cursor-pointer" size="32" color="#000"/>
      </CardFooter>
    </Card>
  )
}
