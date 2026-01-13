// src/constants/navigation.js
export const SHOP_CATEGORIES = [
  { id: "1", name: "Electronics", emoji: "⚡" },
  { id: "2", name: "Fashion", emoji: "👕" },
  { id: "3", name: "Home", emoji: "🏠" },
  { id: "4", name: "Sports", emoji: "⚽" },
  { id: "5", name: "Books", emoji: "📚" },
  { id: "6", name: "Toys", emoji: "🎮" },
];

export const NAVBAR_LINKS = [
  { path: "/about", icon: "HelpCircle", label: "About" },
  { path: "/contact", icon: "Mail", label: "Contact" },
];

export const FOOTER_SECTIONS = {
  quickLinks: [
    { label: "Shop", path: "/shop" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: null, isButton: true },
    { label: "My Orders", path: "/orders" },
  ],
  support: [
    { label: "Shipping Policy", href: "#" },
    { label: "Return Policy", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
  ],
  socials: [
    { name: "Facebook", key: "facebook" },
    { name: "Twitter", key: "twitter" },
    { name: "Instagram", key: "instagram" },
    { name: "Linkedin", key: "linkedin" },
  ],
  contact: {
    email: "support@shophub.com",
    phone: "+92 306 9829900",
    address: "7th Road, Rawalpindi",
  },
};

export const ADMIN_MENU_ITEMS = [
  { path: "/admin", icon: "LayoutDashboard", label: "Dashboard" },
  { path: "/admin/products", icon: "Package", label: "Products" },
  { path: "/admin/orders", icon: "ShoppingCart", label: "Orders" },
  { path: "/admin/users", icon: "Users", label: "Users" },
  { path: "/admin/categories", icon: "FolderTree", label: "Categories" },
];
