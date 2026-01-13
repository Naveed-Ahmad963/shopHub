// src/components/common/NavLink.jsx
import React from "react";
import { Link } from "react-router-dom";

const NavLink = ({
  to,
  icon: Icon,
  label,
  onClick,
  isActive = false,
  className = "",
  children,
  ...props
}) => {
  const baseStyles =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors";

  const defaultActiveStyles = "bg-blue-50 text-blue-600";
  const defaultInactiveStyles = "text-gray-700 hover:bg-gray-100";

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${baseStyles} ${
        isActive ? defaultActiveStyles : defaultInactiveStyles
      } ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span className="font-medium">{label}</span>
      {children}
    </Link>
  );
};

export default NavLink;
