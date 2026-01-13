import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, TrendingUp, Shield } from "lucide-react";

const Hero = () => {
  const features = [
    { icon: Sparkles, text: "Premium Quality" },
    { icon: TrendingUp, text: "Best Prices" },
    { icon: Shield, text: "Secure Shopping" },
  ];

  return (
    <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white py-24 overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-10"></div>

      {/* Decorative gradient circles */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 opacity-20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] bg-gradient-to-br from-blue-400 via-cyan-300 to-purple-500 opacity-20 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full mb-6 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-semibold">
              Trusted by 10,000+ customers
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight animate-fade-in-up">
            Welcome to <span className="text-yellow-300">ShopHub</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl mb-4 text-indigo-100 animate-fade-in-up delay-200 font-medium max-w-3xl mx-auto leading-relaxed">
            Your trusted destination for premium products at unbeatable prices.
          </p>

          {/* Additional description */}
          <p className="text-base md:text-lg mb-10 text-indigo-200 animate-fade-in-up delay-300 max-w-2xl mx-auto">
            Explore our curated collection of quality items, backed by
            exceptional customer service and secure checkout.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10 animate-fade-in-up delay-400">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-full"
              >
                <feature.icon className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-semibold">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-500">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center bg-yellow-400 text-indigo-900 px-8 py-4 rounded-xl font-bold text-base shadow-lg transform transition hover:scale-105 hover:shadow-xl hover:bg-yellow-300"
            >
              Shop Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-white hover:text-indigo-900 transform transition hover:scale-105 shadow-lg"
            >
              Sign Up Free
            </Link>
          </div>

          {/* Trust indicator */}
          <p className="mt-8 text-sm text-indigo-200 animate-fade-in-up delay-600">
            ✓ Free shipping on orders over $50 · ✓ 30-day money back guarantee
          </p>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-600 {
          animation-delay: 0.6s;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
