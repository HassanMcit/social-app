import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HeroUIProvider } from "@heroui/react";
import { RouterProvider } from "react-router";
import { myRouting } from "./Routing/AppRouting";
import { Toaster } from "react-hot-toast";
import TokenContext from "./Context/TokenContext/TokenContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import 'react-loading-skeleton/dist/skeleton.css'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Offline, Online } from "react-detect-offline";


const x = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    
      
      <TokenContext>
      <QueryClientProvider client={x}>
        <HeroUIProvider>
          <RouterProvider router={myRouting} />
          <Toaster />
        </HeroUIProvider>
           <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </TokenContext>
    <Offline>
      <div className="bg-black text-white fixed bottom-0 end-0 p-5 rounded-4xl">You Are Offline</div>
    </Offline>
    
  </StrictMode>,
);
