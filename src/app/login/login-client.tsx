"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Link } from "@heroui/react";
import { useAuthStore } from "@/stores/authStore";

type FormField = 'username' | 'password' | 'general';
type FormState = Record<FormField, string>;

const INIT_STATE: FormState = { username: "", password: "", general: "" };
const API_URL = 'https://dummyjson.com/users';

export default function LoginClient() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [form, setForm] = useState(INIT_STATE);
  const [errors, setErrors] = useState(INIT_STATE);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "", general: "" }));
  };

  const validate = () => {
    const newErrors = { ...INIT_STATE };
    if (!form.username.trim()) newErrors.username = "Username or email is required";
    if (!form.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const { users } = await fetch(API_URL).then(r => r.json());
      const user = users.find((u: any) => 
        (u.username === form.username.toLowerCase() || u.email === form.username.toLowerCase()) && u.password === form.password
      );
      user ? (login(user), setTimeout(() => router.push("/"), 1000)) : setErrors(prev => ({ ...prev, general: "Invalid credentials" }));
    } catch {
      setErrors(prev => ({ ...prev, general: "Login error" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md p-8" shadow="lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {['username', 'password'].map(field => (
            <Input
              key={field}
              name={field}
              label={field === 'username' ? 'Username or Email' : 'Password'}
              type={field === 'password' ? 'password' : 'text'}
              placeholder={`Enter your ${field}`}
              value={form[field as keyof FormState]}
              onChange={handleChange}
              isRequired
              isInvalid={!!errors[field as keyof FormState]}
              errorMessage={errors[field as keyof FormState]}
            />
          ))}
          {errors.general && ( <div className="text-danger text-sm text-center">{errors.general}</div> )}
          <Button type="submit" color="primary" size="lg" fullWidth isLoading={loading}>Sign In</Button>
        </form>
        <div className="mt-8 text-center">
          <Link href="/register" className="text-primary hover:underline">Don't have an account? Sign up</Link>
        </div>
      </Card>
    </div>
  );
}