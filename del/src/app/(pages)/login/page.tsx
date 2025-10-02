"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {

  const [user, setUser] = useState({ email: "", password: "" });
  const router = useRouter();

  const onLogin = async () => {
    try {
      const res = await axios.post("/api/auth/login", user);
      router.push("/profile")
    } catch (error) {
      alert("Error")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
      <div className="w-full max-w-md bg-neutral-900 border border-gray-700 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm mb-2">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full bg-black border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-white"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm mb-2">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full bg-black border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-white"
          />
        </div>

        <button
          onClick={onLogin}
          className="w-full bg-black border border-white rounded-lg py-2 font-semibold hover:bg-white hover:text-black transition"
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login