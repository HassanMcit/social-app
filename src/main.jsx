import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HeroUIProvider } from "@heroui/react";
import { RouterProvider } from "react-router";
import { myRouting } from "./Routing/AppRouting";
import { Toaster } from "react-hot-toast";
import TokenContext from "./Context/TokenContext/TokenContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TokenContext>
      <HeroUIProvider>
        <RouterProvider router={myRouting} />
        <Toaster />
      </HeroUIProvider>
    </TokenContext>
  </StrictMode>,
);
