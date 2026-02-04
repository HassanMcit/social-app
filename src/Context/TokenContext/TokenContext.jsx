import { createContext, useState } from "react"

export const TokenCreatedContext = createContext();

export default function TokenContext({children}) {
    const [token,setToken] = useState(localStorage.getItem('token'));
  return (
    <TokenCreatedContext.Provider value={{token, setToken}}>
        {children}
    </TokenCreatedContext.Provider>
  )
}
