import { Mail, Phone } from "lucide-react";

// ============================================
// Configuration & Constants
// ============================================
export const CONTACT_INFO = [
  {
    icon: Mail,
    title: "Email",
    value: "naveedahmadkhan963@gmail.com",
    subtitle: "We respond within 24 hours",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+92 3069829900",
    subtitle: "Mon - Fri, 9 AM - 6 PM EST",
  },
];

export const VALIDATION_RULES = {
  firstName: {
    required: "First name is required",
    minLength: {
      value: 2,
      message: "First name must be at least 2 characters",
    },
  },
  lastName: {
    required: "Last name is required",
    minLength: {
      value: 2,
      message: "Last name must be at least 2 characters",
    },
  },
  phone: {
    pattern: {
      value: /^[0-9]*$/,
      message: "Only digits are allowed",
    },
  },
  subject: {
    required: "Subject is required",
    minLength: {
      value: 3,
      message: "Subject must be at least 3 characters",
    },
  },
  message: {
    required: "Message is required",
    minLength: {
      value: 10,
      message: "Message must be at least 10 characters",
    },
  },
};
