// src/hooks/useLoginForm.js
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials, loginWithCartSync } from "../features/auth/authSlice";
import toast from "react-hot-toast";
import { getErrorMessage } from "../utils/helpers";

export const useLoginForm = (login) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "naveedahmad.codes@gmail.com", password: "123456" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!formData.password.trim()) {
      toast.error("Password is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const result = await login(formData).unwrap();

      // Extract user and token from response
      const user = result.data?.user || result.user;
      const token = result.data?.token || result.token;

      if (!user || !token) {
        throw new Error("Invalid response from server");
      }

      // Store credentials directly without cart sync
      dispatch(setCredentials({ user, token }));

      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      const errorMsg = getErrorMessage(err);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    showPassword,
    setShowPassword,
    isLoading,
    handleSubmit,
  };
};
