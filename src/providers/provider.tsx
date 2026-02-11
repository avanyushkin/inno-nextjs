"use client";
import { HeroUIProvider } from "@heroui/system";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

function AuthInitializer() {
  const setLoading = useAuthStore((state) => state.setLoading);
  
  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return null;
}

export function Providers ({ children }: {children: React.ReactNode}) {
  return (
    <HeroUIProvider>
      <AuthInitializer />
      {children}
    </HeroUIProvider>
  );
}