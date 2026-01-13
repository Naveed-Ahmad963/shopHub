// 5. COMPONENT: components/home/BenefitsSection.jsx
// ============================================
import React from "react";
import { CheckCircle2 } from "lucide-react";

export const BenefitsSection = ({ benefits }) => {
  return (
    <section className="bg-white py-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">
            Why Choose ShopHub
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">
            Premium Benefits for Discerning Shoppers
          </h2>
          <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
            Experience the difference that quality, transparency, and customer
            care makes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all group"
              >
                <Icon className="w-12 h-12 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-5">
                  {benefit.desc}
                </p>
                <div className="space-y-2 pt-5 border-t border-gray-200">
                  {benefit.features.map((feature, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
