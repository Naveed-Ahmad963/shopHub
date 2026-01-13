// src/features/modals/hooks/useFormValidation.js

export const VALIDATION_RULES = {
  name: (field = "Name") => ({
    required: `${field} is required`,
  }),
  email: {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email format",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
  },
  title: {
    required: "Title is required",
  },
  description: {
    required: "Description is required",
  },
  price: {
    required: "Price is required",
    min: {
      value: 0,
      message: "Price must be positive",
    },
  },
  stock: {
    required: "Stock is required",
    min: {
      value: 0,
      message: "Stock must be positive",
    },
  },
  category: {
    required: "Category is required",
  },
  slug: {},
};

export const useFormValidation = () => {
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  return { validateEmail, generateSlug };
};
