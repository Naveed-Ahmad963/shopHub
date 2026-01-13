// 8. REFACTORED: pages/Home.jsx
// ============================================
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowRight, Award, CheckCircle2 } from "lucide-react";
import { useGetProductsQuery } from "../features/products/productsApiSlice";
import ProductCard from "../features/products/ProductCard";
import Spinner from "../components/common/Spinner";
import { selectCurrentUser } from "../features/auth/authSlice";
import { useHomeCarousel } from "../hooks/useHomeCarousel";
import { HeroCarousel } from "./componentsHome/HeroCarousel";
import { TrustBadges } from "./componentsHome/TrustBadges";
import { BenefitsSection } from "./componentsHome/BenefitsSection";
import { TestimonialsSection } from "./componentsHome/TestimonialsSection";
import { FAQSection } from "./componentsHome/FAQSection";
import {
  carouselSlides,
  trustBadges,
  benefits,
  testimonials,
  faqs,
  companyStats,
  companyValues,
} from "./data/homeData";

const Home = () => {
  const { data: productsData, isLoading } = useGetProductsQuery({ limit: 12 });
  const products = productsData?.products || [];
  const user = useSelector(selectCurrentUser);
  const { currentSlide, goToSlide, nextSlide, prevSlide } = useHomeCarousel(
    3,
    5000
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Carousel */}
      <HeroCarousel
        slides={carouselSlides}
        currentSlide={currentSlide}
        onSlideChange={goToSlide}
        onNext={nextSlide}
        onPrev={prevSlide}
      />

      {/* Trust Badges */}
      <TrustBadges badges={trustBadges} />

      {/* Benefits */}
      <BenefitsSection benefits={benefits} />

      {/* Brand Story */}
      <section className="bg-gray-50 py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-4">
                Our Mission
              </p>
              <h2 className="text-4xl font-black text-gray-900 mb-8">
                Revolutionizing Premium E-Commerce
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Since 2020, ShopHub has been redefining how people shop online.
                We've built a marketplace where quality meets convenience, and
                trust is our foundation.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Our commitment: Connect discerning shoppers with premium
                products and exceptional service. Every transaction, every
                interaction, every promise—backed by our guarantee.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {companyStats.map((stat, idx) => (
                  <div key={idx}>
                    <p className="text-3xl font-black text-blue-600 mb-1">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 text-lg"
              >
                Read Our Full Story <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-12 border-2 border-gray-200">
              <div className="space-y-6">
                {companyValues.map((value, idx) => (
                  <div key={idx} className="flex gap-4">
                    <Award className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">
                        {value.title}
                      </h4>
                      <p className="text-gray-700 text-sm">{value.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">
                Top Selections
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                Best Selling Products
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden lg:flex items-center gap-2 text-gray-700 hover:text-blue-600 font-semibold text-lg"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {products.slice(0, 12).map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              <div className="text-center">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-12 py-4 rounded-lg font-semibold transition-all hover:scale-105 text-lg"
                >
                  Explore Complete Catalog <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection testimonials={testimonials} />

      {/* FAQ */}
      <FAQSection faqs={faqs} />

      {/* CTA Section */}
      {!user && (
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-blue-200 font-semibold text-sm tracking-widest uppercase mb-6">
              Join Our Premium Community
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              Start Shopping With Confidence
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
              Access premium products, expert support, and exclusive benefits.
              Create your free account today and get 20% off your first order.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-gray-50 px-12 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-lg"
              >
                Create Free Account <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 bg-white/20 border-2 border-white text-white hover:bg-white/30 px-12 py-4 rounded-lg font-bold text-lg transition-all"
              >
                Browse Products
              </Link>
            </div>

            <div className="mt-16 pt-12 border-t border-blue-400 text-blue-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                {[
                  "30-day money-back guarantee",
                  "Free shipping on orders $50+",
                  "24/7 expert customer support",
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
