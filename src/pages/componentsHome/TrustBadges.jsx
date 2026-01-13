// 4. COMPONENT: components/home/TrustBadges.jsx
// ============================================
import React from "react";

export const TrustBadges = ({ badges }) => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="text-center p-6 rounded-xl hover:bg-white hover:shadow-lg transition-all"
              >
                <Icon className="w-14 h-14 text-blue-600 mx-auto mb-4" />
                <h4 className="font-bold text-gray-900 mb-2">{badge.title}</h4>
                <p className="text-sm text-gray-600">{badge.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
