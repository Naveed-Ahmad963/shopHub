// 7. COMPONENT: components/home/FAQSection.jsx
// ============================================
import React, { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const FAQSection = ({ faqs }) => {
  const [expandedFaq, setExpandedFaq] = useState(0);

  return (
    <section className="bg-white py-20 border-b border-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">
            Support Center
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden hover:border-blue-300 transition-all"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? -1 : idx)}
                className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-all text-left group"
              >
                <span className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-gray-600 transition-transform flex-shrink-0 ${
                    expandedFaq === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedFaq === idx && (
                <div className="px-8 py-8 bg-gray-50 border-t-2 border-gray-200">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center p-8 bg-blue-50 rounded-xl border-2 border-blue-200">
          <h4 className="font-bold text-gray-900 mb-2 text-lg">
            Need More Help?
          </h4>
          <p className="text-gray-700 mb-4">
            Our support team is available 24/7 to assist you
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 text-lg"
          >
            Contact Support Team <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
