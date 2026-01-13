import { ArrowRight, ShoppingBag, Loader2 } from "lucide-react";
import { useResetPasswordMutation } from "../../api/authApi";
import { useResetPassword } from "../../hooks/useResetPassword";
import { AuthFormContainer } from "./components/AuthFormContainer";
import { AuthInput } from "./components/AuthInput";
import { PasswordStrengthIndicator } from "./components/PasswordStrengthIndicator";

const ResetPassword = () => {
  const [resetPassword] = useResetPasswordMutation();

  const {
    formData,
    handleChange,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isLoading,
    handleSubmit,
  } = useResetPassword(resetPassword);

  return (
    <AuthFormContainer
      title="Reset Password"
      subtitle="Enter your new password below"
      icon={ShoppingBag}
    >
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6">
        <p className="text-blue-800 text-sm">
          <strong>Security tip:</strong> Choose a strong password that's at
          least 6 characters long.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <AuthInput
            label="New Password"
            icon={Lock}
            type="password"
            placeholder="Enter new password"
            value={formData.password}
            onChange={handleChange}
            name="password"
            required
            showToggle
            isVisible={showPassword}
            onToggleVisibility={() => setShowPassword(!showPassword)}
          />
          {formData.password && (
            <div className="mt-2">
              <PasswordStrengthIndicator password={formData.password} />
            </div>
          )}
        </div>

        <div>
          <AuthInput
            label="Confirm New Password"
            icon={Lock}
            type="password"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
            required
            showToggle
            isVisible={showConfirmPassword}
            onToggleVisibility={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
          />
          {formData.confirmPassword && (
            <div className="mt-2">
              <PasswordStrengthIndicator
                password={formData.password}
                confirmPassword={formData.confirmPassword}
                showConfirmPassword
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-3 py-3.5 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-lg rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Resetting Password...
            </>
          ) : (
            <>
              Reset Password
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      <div className="text-center pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:text-blue-500"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </AuthFormContainer>
  );
};

export default ResetPassword;
