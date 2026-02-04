import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@heroui/react";
import { Link, NavLink } from "react-router";
import AppButton from "../../Shared/AppButton/AppButton";
import { useContext, useState } from "react";
import { Polkadot } from "iconsax-reactjs";
import { TokenCreatedContext } from "../../Context/TokenContext/TokenContext";

export default function AppNavbar() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {token} = useContext(TokenCreatedContext);

  function handleLogOut() {
    setToken(null);
  }

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen} isBordered={true} className="bg-blue-400/30">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand as={Link} to='/'>
            <Polkadot size="54" color="#FFF" variant="Bulk"/>
        </NavbarBrand>
      </NavbarContent>

      {token && <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem >
          <NavLink to="posts" className={function({isActive}) {return `text-3xl ${isActive ? "text-blue-500 border-b-3 border-white" : "text-white/85"}`}}>
            Posts
          </NavLink>
        </NavbarItem>
      </NavbarContent>}
      <NavbarContent  justify="end">
        {token ? <NavbarItem>
             <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform cursor-pointer"
              color="primary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogOut}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        </NavbarItem> :  <NavbarItem>
          <AppButton as={Link} color="primary" to="register" variant="shadow">Sign Up</AppButton>
        </NavbarItem>}
       
        
      </NavbarContent>
      <NavbarMenu>
        {token ? <NavbarMenuItem>
            <NavLink onClick={function(){setIsMenuOpen(false)}} className={function({isActive}) {return ` ${isActive ? "text-blue-500 border-b-3 border-black" : "text-black"}`}}
            to="posts"
            >
                Posts
            </NavLink>
          </NavbarMenuItem> : 
          <NavbarMenuItem>
            <NavLink onClick={function(){setIsMenuOpen(false)}} className={function({isActive}) {return ` ${isActive ? "text-blue-500 border-b-3 border-black" : "text-black"}`}} to="register"
            >
                Sign Up
            </NavLink>
          </NavbarMenuItem>
          }
          

          

      </NavbarMenu>
    </Navbar>
  )
}
