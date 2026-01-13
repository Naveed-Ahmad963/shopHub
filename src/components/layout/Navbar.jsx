// src/components/layout/PremiumNavbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Search, ChevronDown, DollarSign } from "lucide-react";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { logoutWithCartSave } from "../../features/auth/authSlice";
import { useUpdateCartMutation } from "../../api/cartApi";
import { useLogoutMutation } from "../../api/authApi";
import toast from "react-hot-toast";
import NavbarBrand from "./components/NavbarBrand";

import UserDropdown from "./components/UserDropdown";
import MobileMenu from "./components/MobileMenu";
import { NAVBAR_LINKS, SHOP_CATEGORIES } from "./data/Constants";
import { getIcon } from "../../utils/iconMap";

const PremiumNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    "iPhone 15",
    "Laptop",
    "Headphones",
  ]);

  const dropdownRef = useRef(null);
  const user = useSelector(selectCurrentUser);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [updateCart] = useUpdateCartMutation();
  const [logout] = useLogoutMutation();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync search from URL
  useEffect(() => {
    if (location.pathname === "/shop") {
      const urlSearch =
        new URLSearchParams(location.search).get("search") || "";
      setSearchQuery(urlSearch);
    }
  }, [location.search, location.pathname]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutWithCartSave({ updateCart })).unwrap();
      await logout().unwrap();
      toast.success("Logged out successfully!");
      navigate("/");
      setShowUserDropdown(false);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  const handleSearch = (e, query = searchQuery) => {
    e.preventDefault();
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      if (!recentSearches.includes(trimmedQuery)) {
        setRecentSearches([trimmedQuery, ...recentSearches.slice(0, 4)]);
      }
      navigate(`/shop?search=${encodeURIComponent(trimmedQuery)}`);
    } else {
      navigate("/shop");
    }

    setIsMenuOpen(false);
    setSearchQuery("");
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value === "" && location.pathname === "/shop") {
      navigate("/shop");
    }
  };

  const cartItemsCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const SearchIcon = getIcon("Search");
  const MenuIcon = getIcon("Menu");
  const XIcon = getIcon("X");
  const ShoppingCartIcon = getIcon("ShoppingCart");
  const ChevronDownIcon = getIcon("ChevronDown");

  return (
    <>
      {/* Top Info Bar */}
      <div className="hidden md:block bg-gradient-to-r from-blue-700 to-blue-800 text-white text-xs py-2.5 border-b border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 hover:text-blue-200 cursor-pointer transition-colors">
              <span>📍 Delivery all over Pakistan</span>
            </div>
            <Link
              to="/orders"
              className="flex items-center gap-2 hover:text-blue-200 transition-colors"
            >
              <span>🚚 Track Orders</span>
            </Link>
          </div>
          <Link
            to="/shop"
            className="hover:text-blue-200 cursor-pointer transition-colors"
          >
            🎉 Best Deals
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-2xl py-2"
            : "bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 backdrop-blur-lg shadow-xl py-3"
        } border-b border-gray-200/50`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 gap-4">
            <NavbarBrand isScrolled={isScrolled} brandName="ShopHub" />

            {/* Advanced Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-2xl mx-6 group">
              <div className="relative w-full">
                <form
                  onSubmit={(e) => handleSearch(e)}
                  className="flex items-center bg-white rounded-full shadow-lg overflow-hidden group-focus-within:shadow-2xl group-focus-within:ring-2 group-focus-within:ring-blue-400 transition-all duration-300"
                >
                  <SearchIcon className="w-5 h-5 text-gray-400 mx-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search products, brands, and more..."
                    className="flex-1 px-2 py-3.5 text-gray-700 placeholder:text-gray-500 focus:outline-none text-sm"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center gap-2"
                  >
                    <SearchIcon className="w-4 h-4" />
                    Search
                  </button>
                </form>
              </div>
            </div>

            {/* Desktop Navigation Icons */}
            <div className="hidden md:flex items-center space-x-1">
              {NAVBAR_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`p-3 rounded-lg transition-all duration-300 group flex items-center gap-2 ${
                    isScrolled
                      ? "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  {(() => {
                    const Icon = getIcon(link.icon);
                    return Icon ? (
                      <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    ) : null;
                  })()}
                  <span className="text-sm font-medium hidden lg:inline">
                    {link.label}
                  </span>
                </Link>
              ))}

              {/* Cart Button */}
              <Link
                to="/cart"
                className={`relative p-3 rounded-lg transition-all duration-300 group ${
                  isScrolled
                    ? "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    : "text-white hover:bg-white/20"
                }`}
              >
                <div className="relative group-hover:scale-110 transition-transform">
                  <ShoppingCartIcon className="w-6 h-6" />
                </div>
                {cartItemsCount > 0 && (
                  <span
                    className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white animate-bounce ${
                      isScrolled
                        ? "bg-gradient-to-r from-blue-600 to-blue-700"
                        : "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900"
                    }`}
                  >
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {/* User Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className={`p-3 rounded-lg transition-all duration-300 group flex items-center gap-2 ${
                    isScrolled
                      ? "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  <UserDropdown.Avatar user={user} isScrolled={isScrolled} />
                  <ChevronDownIcon
                    className={`w-4 h-4 transition-transform ${
                      showUserDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showUserDropdown && (
                  <UserDropdown
                    user={user}
                    onLogout={handleLogout}
                    onClose={() => setShowUserDropdown(false)}
                  />
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-all group ${
                isScrolled
                  ? "text-gray-700 hover:bg-gray-200"
                  : "text-white hover:bg-white/20"
              }`}
            >
              {isMenuOpen ? (
                <XIcon className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              ) : (
                <MenuIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              )}
            </button>
          </div>

          {/* Categories Bar - Desktop */}
          {!isScrolled && (
            <div className="hidden lg:flex items-center gap-2 mt-3 pb-3 border-t border-white/20 pt-3 overflow-x-auto">
              <Link
                to="/shop"
                className="flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all text-white hover:bg-white/20"
              >
                🎯 All Categories
              </Link>

              {SHOP_CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  to="/shop"
                  className="px-4 py-2 rounded-lg whitespace-nowrap transition-all text-white hover:bg-white/20"
                >
                  {cat.emoji} {cat.name}
                </Link>
              ))}

              <Link
                to="/shop"
                className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all font-semibold text-yellow-300 hover:bg-white/20"
              >
                <DollarSign className="w-5 h-5" />
                Today's Deals
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <MobileMenu
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSearch={handleSearch}
          cartItemsCount={cartItemsCount}
          user={user}
          onLogout={handleLogout}
          onClose={() => setIsMenuOpen(false)}
        />
      )}

      <style>{`
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default PremiumNavbar;
