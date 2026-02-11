"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import CartIcon from "@/components/CartIcon";
import { useAuthStore } from "@/stores/authStore";
import { User, LogOut } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/cart", label: "Cart"}
  ];
  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/">
          <p className="font-bold text-inherit">SHOP</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navItems.map ((item) => {
            const isActive = pathname === item.href;
            return (
              <NavbarItem key = {item.href}>
                <Link color = "foreground" href = {item.href}
                    className = {`px-3 py-1 ${isActive ? "text-blue-500" : "text-foreground"}
                        hover:text-blue-300 hover:border
                        hover:border-blue-300 hover:rounded-md
                        transition-colors
                        transition-border
                        duration-200`}
                >
                  {item.label}
                </Link>
              </NavbarItem>
            )
        })}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <CartIcon />
        </NavbarItem>
        {user ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="light" startContent={<User className="h-4 w-4" />}>
                    {user.firstName || user.username}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{user.email}</p>
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger" className="text-danger" onClick={logout}>
                    <div className="flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      Log Out
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/register" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}