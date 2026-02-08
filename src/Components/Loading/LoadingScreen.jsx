import { RingLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-500 flex justify-center items-center fixed top-0 bottom-0 start-0 end-0 z-50">
        <RingLoader size={200} color="white"/>
    </div>
  )
}
