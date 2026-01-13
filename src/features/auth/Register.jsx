// src/features/auth/Register.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useRegisterMutation,
} from "./authApiSlice";
import { useRegisterForm } from "../../hooks/useRegisterForm";
import { AuthFormContainer } from "./components/AuthFormContainer";
import { AuthInput } from "./components/AuthInput";
import { StepIndicator } from "./components/StepIndicator";
import { OtpTimer } from "./components/OtpTimer";
import { PasswordStrengthIndicator } from "./components/PasswordStrengthIndicator";
import Spinner from "../../components/common/Spinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import { getErrorMessage } from "../../utils/helpers";
import {
  UserPlus,
  User,
  Mail,
  Lock,
  CheckCircle,
  KeyRound,
} from "lucide-react";

const Register = () => {
  const [sendOtp, { error: sendOtpError }] = useSendOtpMutation();
  const [verifyOtp, { error: verifyOtpError }] = useVerifyOtpMutation();
  const [registerUser, { error: registerError }] = useRegisterMutation();

  const {
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
  } = useRegisterForm(sendOtp, verifyOtp, registerUser);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AuthFormContainer
      title="Join Us Today"
      subtitle="Create your account securely"
      icon={UserPlus}
    >
      {/* ========== STEP 1: EMAIL OTP ========== */}
      {step === 1 && (
        <form onSubmit={handleSendOtp} className="space-y-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-semibold text-gray-900">Verify Email</h3>
          </div>

          {sendOtpError && (
            <ErrorMessage message={getErrorMessage(sendOtpError)} />
          )}

          <AuthInput
            label="Email Address"
            icon={Mail}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-lg rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Spinner size="sm" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <KeyRound className="w-5 h-5" />
                Send OTP
              </>
            )}
          </button>

          <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      )}

      {/* ========== STEP 2: VERIFY OTP ========== */}
      {step === 2 && (
        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-semibold text-gray-900">Enter OTP</h3>
          </div>

          {verifyOtpError && (
            <ErrorMessage message={getErrorMessage(verifyOtpError)} />
          )}

          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Enter 6-Digit OTP
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <KeyRound className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="otp"
                type="text"
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="000000"
                className="w-full pl-12 pr-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-center text-2xl tracking-widest font-bold"
              />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Check your email for the OTP code
            </p>
          </div>

          <OtpTimer timer={otpTimer} />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-lg rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Spinner size="sm" />
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Verify OTP
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setStep(1);
              setOtp("");
            }}
            className="w-full text-blue-600 font-semibold hover:underline"
          >
            Back to Email
          </button>
        </form>
      )}

      {/* ========== STEP 3: REGISTRATION DETAILS ========== */}
      {step === 3 && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-semibold text-gray-900">Complete Profile</h3>
          </div>

          {registerError && (
            <ErrorMessage message={getErrorMessage(registerError)} />
          )}

          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                className="w-full pl-12 pr-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your full name"
              />
            </div>
            {errors.name && (
              <p className="mt-2 text-sm text-red-600 font-semibold">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full pl-12 pr-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Create a password"
              />
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600 font-semibold">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <CheckCircle className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full pl-12 pr-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Confirm your password"
              />
            </div>
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600 font-semibold">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Password Strength Indicator */}
          <PasswordStrengthIndicator
            password={password}
            confirmPassword={register("confirmPassword").value}
            showConfirmPassword={true}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-lg rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <>
                <Spinner size="sm" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                Create Account
              </>
            )}
          </button>

          <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      )}

      {/* Progress Indicator */}
      <div className="mt-8">
        <StepIndicator totalSteps={3} currentStep={step} />
      </div>
    </AuthFormContainer>
  );
};

export default Register;
