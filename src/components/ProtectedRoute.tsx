"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <Card className="w-full max-w-md p-8 text-center" shadow="lg">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Authentication Required</h1>
            <p className="text-gray-600">Please sign in to access this page</p>
          </div>
          
          <div className="space-y-4">
            <Link href="/login">
              <Button
                color="primary"
                size="lg"
                fullWidth
              >
                Sign In
              </Button>
            </Link>
            
            <Link href="/register">
              <Button
                variant="flat"
                size="lg"
                fullWidth
              >
                Create Account
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
