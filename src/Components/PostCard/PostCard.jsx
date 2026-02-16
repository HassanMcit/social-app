import { Card, CardBody, CardFooter, CardHeader, Divider, Image } from '@heroui/react'
import { MessageText, More } from 'iconsax-reactjs'
import { Link } from 'react-router'
import ShowComment from '../ShowComment/ShowComment'
import CreateComments from '../CreateComments/CreateComments'

export default function PostCard({post, comment}) {

  // console.log(data.commentsCount)
    // console.log(data.topComment)
  
    const {user:{name, photo},body, image, createdAt,commentsCount, _id, topComment} = post


  
  return (
    <>
    <Card >
      <CardHeader className="flex gap-3 justify-between">
        <div className='flex gap-3'>
            <Image
          alt="heroui logo"
          height={40}
          radius="md"
          src={photo}
          className='bg-gray-400 rounded-full'
          width={40}
        />
        <div>
          <p className="text-md font-semibold capitalize">{name}</p>
          <p className="text-sm">{new Date(createdAt).toLocaleDateString("en-US")}</p>
        </div>
        </div>
        <div className='self-start cursor-pointer'><More size="20" color="#697689"/></div>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col items-center">
        <p>{body}</p>
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={image ?  image: "https://heroui.com/images/hero-card-complete.jpeg" }
          // width={270}
        />
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-between">
        <div className='flex gap-2'>
        {commentsCount }<MessageText className="cursor-pointer" size="20" variant='TwoTone' color="#000"/></div>
        {!comment && <Link to={`/postDetails/${_id}`} className='text-sm text-blue-400 hover:underline'>All Comments</Link>}
      </CardFooter>
    <div className='m-4'>
      {!comment ? commentsCount > 0 && <ShowComment comment={topComment} /> : <div className='space-y-6'>
        {comment.map(function(e){return  <ShowComment key={e._id} comment={e}/>})}
        </div>}

    </div>
    <div className='m-5'>
      <CreateComments id={_id}/>
    </div>
    </Card>
    </>
  )
}
