"use client";
import { HeroUIProvider } from "@heroui/system";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";

export function Providers ({ children }: {children: React.ReactNode}) {
  return (
    <HeroUIProvider>
      <AuthProvider>
        <CartProvider>{children}</CartProvider>
      </AuthProvider>
    </HeroUIProvider>
  );
}