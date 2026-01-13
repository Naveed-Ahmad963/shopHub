// 6. COMPONENT: components/home/TestimonialsSection.jsx
// ============================================
import React from "react";
import { Star, CheckCircle2 } from "lucide-react";

export const TestimonialsSection = ({ testimonials }) => {
  return (
    <section className="bg-gray-50 py-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">
            Client Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">
            Trusted by Professionals Worldwide
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed font-medium text-lg">
                "{testimonial.text}"
              </p>
              <div className="border-t border-gray-200 pt-6">
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.title}</p>
                <p className="text-sm text-blue-600 font-semibold mb-3">
                  {testimonial.company}
                </p>
                <p className="text-xs text-green-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  {testimonial.verification}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
