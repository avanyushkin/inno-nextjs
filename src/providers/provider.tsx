"use client";
import { HeroUIProvider } from "@heroui/system";
import { CartProvider } from "@/contexts/CartContext";
export function Providers ({ children }: {children: React.ReactNode}) {
  return (
    <HeroUIProvider>
      <CartProvider>{children}</CartProvider>
    </HeroUIProvider>
  );
}