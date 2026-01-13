// hooks/useForgotPassword.js
import { useState } from "react";
import toast from "react-hot-toast";
// import { getErrorMessage } from "../../utils/helpers";

export const useForgotPassword = (forgotPassword) => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      await forgotPassword({ email }).unwrap();
      setEmailSent(true);
      toast.success("Reset link sent! Check your email.");
    } catch (error) {
      const message =
        error.data?.message || error.message || "Something went wrong";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setEmailSent(false);
    setEmail("");
  };

  return {
    email,
    setEmail,
    emailSent,
    isLoading,
    handleSubmit,
    reset,
  };
};
