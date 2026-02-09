"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Link } from "@heroui/react";

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export default function LoginClient() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    general: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: "" }));
    }
  };
  const validateForm = () => {
    const newErrors = {
      username: "",
      password: "",
      general: "",
    };
    if (!formData.username.trim()) {
      newErrors.username = "Username or email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const authenticateUser = async (username: string, password: string): Promise<User | null> => {
    try {
      const response = await fetch('https://dummyjson.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      const users = data.users;
      const user = users.find((u: User) => 
        (u.username === username.toLowerCase() || u.email === username.toLowerCase()) && 
        u.password === password
      );
      return user || null;
    } catch (error) {
      console.error('Authentication error:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    
    try {
      const user = await authenticateUser(formData.username, formData.password);
      if (user) {
        localStorage.setItem('user', JSON.stringify({
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        }));
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        setErrors(prev => ({...prev, general: "Invalid username/email or password"}));
      }
    } catch (error) {
      setErrors(prev => ({...prev,
        general: "Error during login"
      }));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md p-8" shadow="lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            name="username"
            label="Username or Email"
            placeholder="Enter your username or email"
            value={formData.username}
            onChange={handleChange}
            isRequired
            isInvalid={!!errors.username}
            errorMessage={errors.username}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            isRequired
            isInvalid={!!errors.password}
            errorMessage={errors.password}
          />
          {errors.general && (
            <div className="text-danger text-sm text-center">
              {errors.general}
            </div>
          )}

          <Button
            type="submit"
            color="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            className="mt-6"
          >
            Sign In
          </Button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <div>
            <Link 
              href="/register" 
              className="text-primary hover:underline"
            >
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
