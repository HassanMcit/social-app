import { Avatar, Card, CardBody, CardHeader, Divider, Image } from "@heroui/react";
import { TokenCreatedContext } from "../../Context/TokenContext/TokenContext";
import { useContext } from "react";

export default function ShowComment({ comment }) {
  const { userData } = useContext(TokenCreatedContext);
  console.log(comment)
  return (
    <Card className="bg-gray-600 text-white">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            onError={function (e) { e.target.src = "https://heroui.com/avatars/avatar-1.png" }}
            src={comment.commentCreator.photo}
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
