// src/components/layout/Footer.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { FOOTER_SECTIONS } from "./data/Constants";
import { getIcon } from "../../utils/iconMap";
import LinkGroup from "./components/LinkGroup";

const Footer = () => {
  const navigate = useNavigate();

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContactClick = () => {
    navigate("/contact");
    setTimeout(() => {
      const formElement = document.querySelector("[data-contact-form]");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100);
  };

  const renderQuickLink = (item) => {
    if (item.isButton) {
      return (
        <button
          onClick={handleContactClick}
          className="text-blue-100 flex items-center gap-2 relative bg-none border-none cursor-pointer font-medium"
        >
          <span className="absolute left-0 h-0.5 w-0 bg-white group-hover:w-3 transition-all duration-300 rounded-full"></span>
          <span className="ml-0 group-hover:ml-5 transition-all duration-300">
            {item.label}
          </span>
        </button>
      );
    }

    return (
      <Link
        to={item.path}
        onClick={handleLinkClick}
        className="text-blue-100 flex items-center gap-2 relative font-medium group"
      >
        <span className="absolute left-0 h-0.5 w-0 bg-white group-hover:w-3 transition-all duration-300 rounded-full"></span>
        <span className="ml-0 group-hover:ml-5 transition-all duration-300">
          {item.label}
        </span>
      </Link>
    );
  };

  const renderSupportLink = (item) => (
    <a
      href={item.href}
      className="text-blue-100 flex items-center gap-2 relative font-medium group"
    >
      <span className="absolute left-0 h-0.5 w-0 bg-white group-hover:w-3 transition-all duration-300 rounded-full"></span>
      <span className="ml-0 group-hover:ml-5 transition-all duration-300">
        {item.label}
      </span>
    </a>
  );

  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" onClick={handleLinkClick}>
              <span className="text-3xl font-bold text-white">ShopHub</span>
            </Link>
            <p className="text-blue-100 text-sm mt-3 leading-relaxed">
              Premium shopping made simple. Your trusted destination for quality
              products and exceptional service.
            </p>
          </div>

          {/* Quick Links */}
          <LinkGroup
            title="Quick Links"
            items={FOOTER_SECTIONS.quickLinks}
            renderItem={renderQuickLink}
          />

          {/* Support */}
          <LinkGroup
            title="Support"
            items={FOOTER_SECTIONS.support}
            renderItem={renderSupportLink}
          />

          {/* Contact */}
          <div>
            <h5 className="font-bold text-white text-sm uppercase tracking-wide mb-6">
              Contact
            </h5>
            <ul className="space-y-4 text-sm">
              <li className="group flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-100 mt-0.5 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                <a
                  href={`mailto:${FOOTER_SECTIONS.contact.email}`}
                  className="text-blue-100 group-hover:text-white font-medium transition-colors duration-300"
                >
                  {FOOTER_SECTIONS.contact.email}
                </a>
              </li>
              <li className="group flex items-start gap-3">
                <Phone className="w-4 h-4 text-blue-100 mt-0.5 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                <a
                  href={`tel:${FOOTER_SECTIONS.contact.phone}`}
                  className="text-blue-100 group-hover:text-white font-medium transition-colors duration-300"
                >
                  {FOOTER_SECTIONS.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-100" />
                <span className="text-blue-100">
                  {FOOTER_SECTIONS.contact.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-400 border-opacity-30 py-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="text-blue-100 text-sm">
            © {new Date().getFullYear()} ShopHub. All rights reserved.
          </div>

          {/* Social */}
          <div className="flex gap-4">
            {FOOTER_SECTIONS.socials.map((social, idx) => {
              const Icon = getIcon(
                social.key.charAt(0).toUpperCase() + social.key.slice(1)
              );
              return (
                Icon && (
                  <a
                    key={idx}
                    href="#"
                    className="w-10 h-10 rounded-lg border border-blue-400 border-opacity-40 flex items-center justify-center text-blue-100 hover:text-white hover:border-white hover:border-opacity-100 hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              );
            })}
          </div>

          {/* Newsletter */}
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2.5 border border-blue-400 border-opacity-40 rounded-lg bg-white bg-opacity-10 text-white placeholder-blue-100 text-sm focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
            />
            <button className="px-6 py-2.5 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-300 text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
