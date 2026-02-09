"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname ();
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/cart", label: "Cart"},
    { href: "/favorite", label: "Favorite"}
  ];
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">SHOP</p>
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
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}