// src/hooks/useRegisterForm.js
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setCredentials } from "../features/auth/authSlice";
import { getErrorMessage } from "../utils/helpers";

export const useRegisterForm = (sendOtp, verifyOtp, registerUser) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", password: "", confirmPassword: "" },
  });

  const password = watch("password");

  // OTP Timer
  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpTimer]);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    setIsLoading(true);

    try {
      await sendOtp({ email }).unwrap();
      toast.success("OTP sent to your email!");
      setOtpTimer(600);
      setStep(2);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);

    try {
      const result = await verifyOtp({ email, otp }).unwrap();

      // ✅ FIX: Extract from nested data object
      const token = result.data?.verificationToken || result.verificationToken;

      if (!token) {
        throw new Error("No verification token received");
      }

      setVerificationToken(token);
      toast.success("Email verified successfully!");
      setStep(3);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!verificationToken) {
      toast.error("Verification token missing. Please verify OTP again.");
      return;
    }

    setIsLoading(true);

    try {
      const { confirmPassword, ...userData } = data;
      const result = await registerUser({
        ...userData,
        email,
        verificationToken,
      }).unwrap();

      // ✅ FIX: Extract user and token from nested response
      const user = result.data?.user || result.user;
      const authToken = result.data?.token || result.token;

      if (!user || !authToken) {
        throw new Error("Invalid registration response");
      }

      dispatch(setCredentials({ user, token: authToken }));
      toast.success("✅ Registration successful!");

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    step,
    setStep,
    email,
    setEmail,
    otp,
    setOtp,
    otpTimer,
    register,
    handleSubmit,
    errors,
    password,
    isLoading,
    handleSendOtp,
    handleVerifyOtp,
    onSubmit,
  };
};
