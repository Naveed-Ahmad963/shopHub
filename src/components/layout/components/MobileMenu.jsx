// src/components/layout/MobileMenu.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, LogOut } from "lucide-react";
import { NAVBAR_LINKS, SHOP_CATEGORIES } from "../data/Constants";
import { getIcon } from "../../../utils/iconMap";

/**
 * MobileMenu component
 * Shows search, categories, and user menu on mobile devices
 */
const MobileMenu = ({
  searchQuery,
  onSearchChange,
  onSearch,
  cartItemsCount,
  user,
  onLogout,
  onClose,
}) => {
  return (
    <div className="md:hidden fixed top-20 left-0 right-0 bottom-0 bg-white z-40 overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Mobile Search Bar */}
        <form
          onSubmit={(e) => onSearch(e)}
          className="flex items-center bg-gray-100 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-blue-400 transition-all"
        >
          <Search className="w-5 h-5 text-gray-400 mx-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search products..."
            className="flex-1 px-2 py-3 bg-gray-100 outline-none text-sm"
          />
        </form>

        {/* Mobile Categories */}
        <div className="space-y-2 border-b pb-4">
          <h3 className="px-4 py-2 font-semibold text-gray-900 text-sm uppercase tracking-wide">
            Categories
          </h3>

          {SHOP_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to="/shop"
              onClick={onClose}
              className="w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-3 font-medium group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {cat.emoji}
              </span>
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>

        {/* Mobile Quick Links */}
        <div className="space-y-2 border-b pb-4">
          <h3 className="px-4 py-2 font-semibold text-gray-900 text-sm uppercase tracking-wide">
            Quick Links
          </h3>

          {/* Cart */}
          <Link
            to="/cart"
            className="w-full px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-3 font-medium group"
            onClick={onClose}
          >
            <ShoppingCart className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
            <span>
              Cart{" "}
              {cartItemsCount > 0 && (
                <span className="text-blue-600 font-bold">
                  ({cartItemsCount})
                </span>
              )}
            </span>
          </Link>

          {/* Navbar Links (About, Contact, etc) */}
          {NAVBAR_LINKS.map((link) => {
            const IconComponent = getIcon(link.icon);
            return (
              <Link
                key={link.path}
                to={link.path}
                className="w-full px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-3 font-medium group"
                onClick={onClose}
              >
                {IconComponent && (
                  <IconComponent className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                )}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile User Section */}
        <div className="border-b pb-4">
          <h3 className="px-4 py-2 font-semibold text-gray-900 text-sm uppercase tracking-wide">
            Account
          </h3>

          {user ? (
            <div className="space-y-2">
              {/* User Profile */}
              <Link
                to="/profile"
                className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-3 font-medium group"
                onClick={onClose}
              >
                <User className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                <span>{user.name}</span>
              </Link>

              {/* Admin Link - Only show for admin users */}
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-3 font-medium group"
                  onClick={onClose}
                >
                  <span className="text-lg">⚙️</span>
                  <span>Admin Panel</span>
                </Link>
              )}

              {/* Logout */}
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-3 font-medium group"
              >
                <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            // Not logged in
            <div className="space-y-2">
              <Link
                to="/login"
                className="block px-4 py-3 text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all"
                onClick={onClose}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-3 text-center border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                onClick={onClose}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div className="px-4 py-2 text-xs text-gray-500 text-center border-t pt-4">
          <p>📍 Delivery all over Pakistan</p>
          <p className="mt-1">🚚 Free shipping on orders over Rs. 5000</p>
        </div>
      </div>

      <style>{`
        @keyframes slide-in-from-top-2 {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-in {
          animation: slide-in-from-top-2 0.2s ease-out;
        }
        
        .fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MobileMenu;
