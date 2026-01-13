// 1. HOOK: hooks/useHomeCarousel.js
// ============================================
import { useState, useEffect } from "react";

export const useHomeCarousel = (totalSlides = 3, interval = 5000) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, interval);
    return () => clearInterval(timer);
  }, [totalSlides, interval]);

  const goToSlide = (index) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  return { currentSlide, goToSlide, nextSlide, prevSlide };
};
