import React from "react";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../api/authApi";
import { Mail, Lock, ArrowRight, ShoppingBag, Loader2 } from "lucide-react";
import { useLoginForm } from "../../hooks/useLoginForm";
import { AuthFormContainer } from "./components/AuthFormContainer";
import { AuthInput } from "./components/AuthInput";

const Login = () => {
  const [login] = useLoginMutation();

  const {
    formData,
    handleChange,
    showPassword,
    setShowPassword,
    isLoading,
    handleSubmit,
  } = useLoginForm(login); // Removed fetchCart and updateCart

  return (
    <AuthFormContainer
      title="Welcome Back"
      subtitle="Sign in to continue shopping"
      icon={ShoppingBag}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <AuthInput
          label="Email Address"
          icon={Mail}
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          name="email"
          required
        />

        <AuthInput
          label="Password"
          icon={Lock}
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          name="password"
          required
          showToggle
          isVisible={showPassword}
          onToggleVisibility={() => setShowPassword(!showPassword)}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
            <span className="ml-2 text-sm text-gray-700 font-medium">
              Remember me
            </span>
          </label>
          <Link
            to="/forgot-password"
            className="text-sm font-semibold text-blue-600 hover:text-blue-500"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-3 py-3.5 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-lg rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500 font-medium">
            Don't have an account?
          </span>
        </div>
      </div>

      <Link
        to="/register"
        className="w-full flex justify-center items-center gap-2 py-3.5 px-6 bg-white border-2 border-blue-200 text-gray-700 font-semibold text-lg rounded-xl hover:border-blue-400 hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        Create Account
      </Link>

      <div className="text-center pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          <a
            href="#"
            className="font-semibold text-blue-600 hover:text-blue-500"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </AuthFormContainer>
  );
};

export default Login;
