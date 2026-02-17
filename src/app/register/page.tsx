"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Link } from "@heroui/react";

export default function RegisterPage () {
  const router = useRouter ();
  const makeInitState = () => ({
    firstName: "", lastName: "", email: "", password: "", confirmPassword: "", 
  });
  const [formData, setFormData] = useState ( makeInitState () );
  const [errors, setErrors] = useState ( makeInitState () );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({...prev, [name]: ""}));
    }
  };
  const validateForm = () => {
    const newErrors = makeInitState ();
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return !Object.values (newErrors).some (error => error !== "");
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault ();
    if (validateForm ()) {
      setTimeout (() => {
        router.push ("/");
      }, 1000);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md p-8" shadow="lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="firstName"
              label="First Name"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              isRequired
              isInvalid={!!errors.firstName}
              errorMessage={errors.firstName}
            />
            <Input
              name="lastName"
              label="Last Name"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              isRequired
              isInvalid={!!errors.lastName}
              errorMessage={errors.lastName}
            />
          </div>
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
          <Input
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            isRequired
            isInvalid={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword}
          />
          <Button
            type="submit"
            color="primary"
            size="lg"
            fullWidth
            className="mt-6"
          >
            Sign Up
          </Button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link 
              href="/login" 
              className="text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
