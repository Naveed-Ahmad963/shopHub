import { Send, CheckCircle, Mail, ArrowLeft, ShoppingBag } from "lucide-react";
import { useForgotPasswordMutation } from "../../api/authApi";
import { useForgotPassword } from "../../hooks/useForgotPassword";
import { AuthFormContainer } from "./components/AuthFormContainer";
import { AuthInput } from "./components/AuthInput";

const ForgotPassword = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  const { email, setEmail, emailSent, isLoading, handleSubmit, reset } =
    useForgotPassword(forgotPassword);

  if (emailSent) {
    return (
      <AuthFormContainer
        title="Check Your Email!"
        subtitle={`Reset link sent to ${email}`}
        icon={Send}
      >
        <div className="space-y-6">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-800 font-semibold">
                  Email sent successfully!
                </p>
                <p className="text-green-700 text-sm mt-2">
                  If that email exists in our system, you'll receive a password
                  reset link shortly.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p className="text-yellow-800 text-sm">
              <strong>⏰ Note:</strong> The reset link expires in 15 minutes
            </p>
          </div>

          <ol className="list-decimal list-inside space-y-2 text-gray-600 text-sm">
            <li>Check your email inbox for the reset link</li>
            <li>Click the link in the email</li>
            <li>Create your new password</li>
            <li>Log in with your new password</li>
          </ol>

          <button
            onClick={reset}
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            Try Another Email
          </button>

          <Link
            to="/login"
            className="w-full flex justify-center items-center gap-2 py-3 px-6 bg-white border-2 border-blue-200 text-gray-700 font-semibold rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>
      </AuthFormContainer>
    );
  }

  return (
    <AuthFormContainer
      title="Forgot Password?"
      subtitle="No worries! We'll send you reset instructions."
      icon={ShoppingBag}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <AuthInput
          label="Email Address"
          icon={Mail}
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <p className="text-sm text-gray-500">
          Enter the email associated with your account
        </p>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-3 py-3.5 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-lg rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <Link
        to="/login"
        className="w-full flex justify-center items-center gap-2 py-3 px-6 bg-white border-2 border-blue-200 text-gray-700 font-semibold rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Login
      </Link>

      <div className="text-center pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:text-blue-500"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </AuthFormContainer>
  );
};

export default ForgotPassword;
