import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@heroui/react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router";
import AppButton from "../../Shared/AppButton/AppButton";
import { useContext, useEffect, useRef, useState } from "react";
import { Polkadot } from "iconsax-reactjs";
import { TokenCreatedContext } from "../../Context/TokenContext/TokenContext";
import { useNavigate } from "react-router";

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const profileImage = useRef();

  const router = useNavigate();

  const { userData, setUserData, getUserData } = useContext(TokenCreatedContext);

  function handleLogOut() {
    router('/login');
    setUserData(null);
    localStorage.removeItem('token')
  }


  function handleProfileImage(e) {
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append("photo", imageFile);

    toast.promise(
      axios.put(`${import.meta.env.VITE_BASE_URL}users/upload-photo`, formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      }),
      {
        loading: "Updating Profile Image...",
        success: ({ data }) => {
          getUserData(localStorage.getItem("token")); // Refresh user data
          return data.message || "Image Updated Successfully";
        },
        error: (err) => {
          console.log(err);
          return err.response?.data?.error || "Failed to update image";
        },
      }
    );
  }


  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen} isBordered={true} className="bg-blue-400/30">
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand as={Link} to='/'>
            <Polkadot size="54" color="#FFF" variant="Bulk" />
          </NavbarBrand>
        </NavbarContent>

        {userData && <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem >
            <NavLink to="posts" className={function ({ isActive }) { return `text-3xl ${isActive ? "text-blue-500 border-b-3 border-white" : "text-white/85"}` }}>
              Posts
            </NavLink>
          </NavbarItem>
        </NavbarContent>}
        <NavbarContent justify="end">
          {userData ? <NavbarItem>
            <Dropdown placement="bottom" className="bg-black/50 text-white text-center">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform cursor-pointer bg-gray-400"
                  color="primary"
                  name="Jason Hughes"
                  size="md"
                  src={userData.photo}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2" textValue="userData">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{userData.email}</p>
                </DropdownItem>
                <DropdownItem key="settings">Name: {userData.name}</DropdownItem>
                <DropdownItem key="team_settings">Change Password</DropdownItem>
                <DropdownItem key="analytics" onClick={function () { profileImage.current.click() }}>
                  Update Profile Image
                </DropdownItem>

                <DropdownItem key="logout" color="danger" onClick={handleLogOut}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem> : <NavbarItem>
            <AppButton as={Link} color="primary" to="register" variant="shadow">Sign Up</AppButton>
          </NavbarItem>}


        </NavbarContent>
        <NavbarMenu>
          {userData ? <NavbarMenuItem>
            <NavLink onClick={function () { setIsMenuOpen(false) }} className={function ({ isActive }) { return ` ${isActive ? "text-blue-500 border-b-3 border-black" : "text-black"}` }}
              to="posts"
            >
              Posts
            </NavLink>
          </NavbarMenuItem> :
            <NavbarMenuItem>
              <NavLink onClick={function () { setIsMenuOpen(false) }} className={function ({ isActive }) { return ` ${isActive ? "text-blue-500 border-b-3 border-black" : "text-black"}` }} to="register"
              >
                Sign Up
              </NavLink>
            </NavbarMenuItem>
          }




        </NavbarMenu>
      <input type="file" className="hidden" ref={profileImage} onChange={handleProfileImage} />
      </Navbar>

    </>
  )
}
