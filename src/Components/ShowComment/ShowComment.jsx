import { Avatar, Card, CardBody, CardHeader, Divider, Image } from "@heroui/react";
import {  useEffect, useState } from "react";

export default function ShowComment({ comment }) {
  const [imageSrc, setImageSrc] = useState(comment.commentCreator.photo);

  useEffect(() => {
    setImageSrc(comment.commentCreator.photo);
  }, [comment.commentCreator.photo]);

  console.log(comment)
  return (
    <Card className="bg-gray-600 text-white">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            onError={() => setImageSrc("https://heroui.com/avatars/avatar-1.png")}
            src={imageSrc}
          />
          <div className="flex flex-col gap-1 items-start justify-center ">
            <h4 className="text-small font-semibold leading-none capitalize">{comment.commentCreator.name}</h4>
            <h5 className="text-small tracking-tight ">{new Date(comment.createdAt).toLocaleDateString('en-US')}</h5>
          </div>
        </div>

      </CardHeader>
      <CardBody className="px-3 py-4 text-small ">
        <p>{comment.content}</p>
      </CardBody>

    </Card>
  )
}
