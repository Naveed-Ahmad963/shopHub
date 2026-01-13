// src/components/layout/UserDropdown.jsx
import React from "react";
import { Link } from "react-router-dom";
import { User, LogOut, Home } from "lucide-react";

/**
 * Get user initials from full name
 * @param {string} name - Full name
 * @returns {string} Initials
 */
const getUserInitials = (name) => {
  if (!name) return "U";
  const parts = name.split(" ");
  return parts.length >= 2
    ? `${parts[0].charAt(0)}${parts[1].charAt(0)}`
    : name.charAt(0);
};

/**
 * Avatar component for navbar user button
 */
const UserAvatar = ({ user, isScrolled }) => {
  if (!user) {
    return (
      <>
        <User className="w-6 h-6" />
        <span className="text-sm font-semibold hidden lg:inline">Account</span>
      </>
    );
  }

  return (
    <>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
          isScrolled
            ? "bg-gradient-to-r from-blue-500 to-blue-600"
            : "bg-gradient-to-r from-blue-400 to-blue-500"
        }`}
      >
        {getUserInitials(user.name)}
      </div>
      <span className="text-sm font-semibold hidden lg:inline">
        {user.name.split(" ")[0]}
      </span>
    </>
  );
};

/**
 * Main UserDropdown component
 * Shows different content based on authentication status
 */
const UserDropdown = ({ user, onLogout, onClose }) => {
  return (
    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
      {user ? (
        // Authenticated User View
        <>
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
            <p className="font-bold text-lg">{user.name}</p>
            <p className="text-blue-100 text-sm">Premium Member</p>
          </div>

          <div className="p-2">
            {/* My Profile */}
            <Link
              to="/profile"
              className="block px-4 py-3 hover:bg-blue-50 text-gray-700 rounded-lg transition-colors flex items-center gap-3 group"
              onClick={onClose}
            >
              <User className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
              <span className="font-medium">My Profile</span>
            </Link>

            {/* Admin Panel - Only show for admin users */}
            {user.role === "admin" && (
              <Link
                to="/admin"
                className="block px-4 py-3 hover:bg-blue-50 text-gray-700 rounded-lg transition-colors flex items-center gap-3 group"
                onClick={onClose}
              >
                <Home className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Admin Panel</span>
              </Link>
            )}

            <hr className="my-2 border-gray-200" />

            {/* Logout */}
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 rounded-lg transition-colors flex items-center gap-3 group"
            >
              <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </>
      ) : (
        // Unauthenticated User View
        <div className="p-4 space-y-3">
          <Link
            to="/login"
            className="w-full block text-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
            onClick={onClose}
          >
            Login
          </Link>

          <Link
            to="/register"
            className="w-full block text-center px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300"
            onClick={onClose}
          >
            Sign Up
          </Link>

          <p className="text-xs text-gray-500 text-center">
            New user? Create an account to track orders
          </p>
        </div>
      )}
    </div>
  );
};

// Export Avatar as static property
UserDropdown.Avatar = UserAvatar;

export default UserDropdown;
