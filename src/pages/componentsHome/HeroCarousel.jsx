// 3. COMPONENT: components/home/HeroCarousel.jsx
// ============================================
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";

export const HeroCarousel = ({
  slides,
  currentSlide,
  onSlideChange,
  onNext,
  onPrev,
}) => {
  return (
    <section className="relative h-96 md:h-[550px] overflow-hidden">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "4rem 4rem",
              }}
            />
          </div>

          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-3xl">
                <p className="text-white/80 font-semibold text-sm tracking-widest uppercase mb-4">
                  Welcome to ShopHub
                </p>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-2xl">
                  {slide.subtitle}
                </p>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg text-lg"
                >
                  {slide.cta}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => onSlideChange(idx)}
            className={`transition-all cursor-pointer ${
              idx === currentSlide
                ? "bg-white w-10 h-1"
                : "bg-white/40 w-2 h-1 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Arrow Navigation */}
      <button
        onClick={onPrev}
        className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all backdrop-blur-sm z-20"
      >
        <ChevronDown className="w-6 h-6 rotate-90" />
      </button>
      <button
        onClick={onNext}
        className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all backdrop-blur-sm z-20"
      >
        <ChevronDown className="w-6 h-6 -rotate-90" />
      </button>
    </section>
  );
};
