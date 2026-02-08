import axios from "axios";
import { createContext, useEffect, useState } from "react"

export const TokenCreatedContext = createContext();



export default function TokenContext({children}) {

    const [userData,setUserData] = useState(null);

    async function getUserData(token) {

      try {
        const {data:{user}} = await axios({
          url: `${import.meta.env.VITE_BASE_URL}users/profile-data`,
          headers: {
            token
          }
        })
         setUserData(user)
      } catch (error) {
        console.log(error.response.data)
      }
    }


    useEffect(function() {
      localStorage.getItem('token') && getUserData(localStorage.getItem('token'))
    }, [])

    

  return (
    <TokenCreatedContext value={{getUserData, userData, setUserData}}>
      
        {children}
    </TokenCreatedContext>
  )
}
