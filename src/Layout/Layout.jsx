import { Outlet } from "react-router";
import AppNavbar from "../Components/AppNavbar/AppNavbar";

export default function Layout() {
  return (
    <main>
      <AppNavbar/>
      <div className="min-h-screen bg-gray-300 overflow-auto">
        <Outlet/>
      </div>
    </main>
  )
}
