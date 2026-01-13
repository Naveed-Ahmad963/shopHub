// src/components/common/IconButton.jsx
import React from "react";
import { getIcon } from "../../utils/iconMap";

const IconButton = ({
  iconName,
  label,
  isActive = false,
  isScrolled = false,
  isDesktop = true,
  onClick,
  className = "",
}) => {
  const Icon = getIcon(iconName);

  if (!Icon) return null;

  const baseStyles =
    "p-3 rounded-lg transition-all duration-300 group flex items-center gap-2";

  const colorStyles = isScrolled
    ? "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
    : "text-white hover:bg-white/20";

  const activeStyles = isActive
    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
    : "";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${colorStyles} ${activeStyles} ${className}`}
    >
      <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
      {isDesktop && label && (
        <span className="text-sm font-medium hidden lg:inline">{label}</span>
      )}
    </button>
  );
};

export default IconButton;
