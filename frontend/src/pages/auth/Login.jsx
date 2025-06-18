import React, { useState } from "react";
import { ChefHat, Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react";
import {  useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/user";
import { toast } from "@/hooks/use-toast";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("customer");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });  

  const navigate = useNavigate(); 
  
  const User = {
    email: formData.email,
    password: formData.password,
    role: userType === "customer" ? "CUSTOMER" : "VENDOR",
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { loginUser } = useUserStore();

  const handleSubmit = async () => {
    const { success, message } = await loginUser(User);
    if (success && formData.password === formData.confirmPassword) {
      toast({
        title: "Success",
        description: "You successfully created a munchmate account",
        type: "success",
      });
      setFormData({
        email: "",
        fullName: "",
        password: "",
        confirmPassword: "",
      });
      console.log("Signup attempt:", { ...formData, userType });
      if (User.role === "VENDOR") {
        toast({
          title: "Welcome aboard, Chef! 🍽️🎉",
          description:
            "Your restaurant is now part of the MunchMate family! 🌟",
          type: "success",
        });

        navigate("/restaurants");
      } else if (User.role === "CUSTOMER") {
        toast({
          title: "Welcome to MunchMate! Fellow Foodie! 🍽️🎉",
          description:
            "Start exploring and ordering your favorite dishes! 🍔🍕",
          type: "success",
        });
        navigate("/customers");
      } else {
        toast({
          title: "Error",
          description: "Please check your credentials",
          type: "error",
        });
        alert(message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <button
            className="flex items-center space-x-3 text-gray-600 hover:text-orange-500 transition-colors duration-500"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-light tracking-wide">Return</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-32 pb-24 px-8">
        <div className="max-w-md mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="w-1 h-12 bg-gradient-to-b from-green-500 to-yellow-500 mx-auto mb-8"></div>
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 border border-gray-300 flex items-center justify-center bg-gradient-to-br from-green-50 to-yellow-50">
                <ChefHat className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <h1 className="text-3xl font-extralight mb-4 tracking-tight">
              <span className="block text-gray-700">Welcome</span>
              <span className="block bg-gradient-to-r from-green-500 to-yellow-500 bg-clip-text text-transparent font-light">
                Back
              </span>
            </h1>
            <div className="w-8 h-px bg-gradient-to-r from-orange-500 to-red-500 mx-auto mt-6"></div>
          </div>

          {/* User Type Selection */}
          <div className="mb-12">
            <div className="grid grid-cols-2 gap-1 bg-gray-50 p-1 border border-gray-200">
              <button
                onClick={() => setUserType("customer")}
                className={`py-4 px-6 font-light text-sm tracking-wide transition-all duration-500 ${
                  userType === "customer"
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Food Lover
              </button>
              <button
                onClick={() => setUserType("restaurant")}
                className={`py-4 px-6 font-light text-sm tracking-wide transition-all duration-500 ${
                  userType === "restaurant"
                    ? "bg-gradient-to-r from-green-500 to-yellow-500 text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Restaurant
              </button>
            </div>
          </div>

          {/* Login Form */}
          <div className="space-y-8">
            {/* Email Input */}
            <div className="relative">
              <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-green-500 to-yellow-500"></div>
              <div className="pl-6">
                <label className="block text-xs font-light text-gray-500 mb-3 tracking-widest uppercase">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-0 py-4 bg-transparent border-0 border-b border-gray-200 focus:border-green-500 outline-none transition-all duration-500 text-gray-700 font-light placeholder-gray-400"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-orange-500 to-red-500"></div>
              <div className="pl-6">
                <label className="block text-xs font-light text-gray-500 mb-3 tracking-widest uppercase">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-8 py-4 bg-transparent border-0 border-b border-gray-200 focus:border-orange-500 outline-none transition-all duration-500 text-gray-700 font-light placeholder-gray-400"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between pt-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <div className="relative">
                  <input type="checkbox" className="sr-only" />
                  <div className="w-4 h-4 border border-gray-300 bg-white"></div>
                </div>
                <span className="text-sm font-light text-gray-600 tracking-wide">
                  Remember
                </span>
              </label>
              <button
                type="button"
                className="text-sm font-light text-gray-500 hover:text-orange-500 transition-colors duration-500 tracking-wide"
              >
                Forgot?
              </button>
            </div>

            {/* Login Button */}
            <div className="pt-8">
              <button
                onClick={handleSubmit}
                className={`group relative w-full py-6 border transition-all duration-700 overflow-hidden ${
                  userType === "customer"
                    ? "border-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500"
                    : "border-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-yellow-500"
                }`}
              >
                <div className="relative z-10">
                  <span
                    className={`font-light tracking-widest text-sm transition-colors duration-500 ${
                      userType === "customer"
                        ? "text-orange-600 group-hover:text-white"
                        : "text-green-600 group-hover:text-white"
                    }`}
                  >
                    ENTER MUNCHMATE
                  </span>
                </div>
              </button>
            </div>

            {/* Divider */}
            <div className="relative py-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-6 bg-white text-xs font-light text-gray-500 tracking-widest">
                  OR CONTINUE WITH
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-1">
              <button className="group border border-gray-200 py-4 hover:bg-gradient-to-br hover:from-gray-50 hover:to-white transition-all duration-500">
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="text-sm font-light text-gray-600 tracking-wide">
                    Google
                  </span>
                </div>
              </button>
              <button className="group border border-gray-200 py-4 hover:bg-gradient-to-br hover:from-gray-50 hover:to-white transition-all duration-500">
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="text-sm font-light text-gray-600 tracking-wide">
                    Facebook
                  </span>
                </div>
              </button>
            </div>

            {/* Footer */}
            <div className="text-center pt-12 border-t border-gray-100">
              <p className="text-sm font-light text-gray-600 leading-relaxed">
                New to MunchMate?{" "}
                <button
                  className="text-orange-500 hover:text-orange-600 font-light transition-colors duration-500 tracking-wide"
                  onClick={() => {
                    window.location.href = "/signup";
                  }}
                >
                  Create account
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
