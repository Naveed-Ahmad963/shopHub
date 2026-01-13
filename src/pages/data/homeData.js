// 2. DATA: data/homeData.js
// ============================================
import {
  Shield,
  Award,
  Lock,
  CheckCircle2,
  Target,
  Zap,
  Users,
  Gift,
  Globe,
} from "lucide-react";

export const carouselSlides = [
  {
    title: "Discover Premium Shopping Experience",
    subtitle: "Curated collections from trusted brands worldwide",
    cta: "Explore Collections",
    gradient: "from-blue-600 via-blue-700 to-blue-800",
  },
  {
    title: "Exclusive Member Offers",
    subtitle: "Get instant access to premium deals and early releases",
    cta: "View Offers",
    gradient: "from-blue-500 via-blue-600 to-blue-700",
  },
  {
    title: "Fast & Reliable Shipping",
    subtitle: "Free shipping on orders over $50 with 30-day returns",
    cta: "Learn More",
    gradient: "from-blue-600 via-blue-700 to-blue-800",
  },
];

export const trustBadges = [
  {
    icon: Lock,
    title: "256-bit SSL Secured",
    desc: "Bank-level encryption on all transactions",
  },
  {
    icon: CheckCircle2,
    title: "Verified Sellers Only",
    desc: "Every vendor is authenticated & monitored",
  },
  {
    icon: Award,
    title: "Industry Certified",
    desc: "ISO 27001 & PCI-DSS Compliant",
  },
  {
    icon: Shield,
    title: "GDPR Protected",
    desc: "Your privacy is our top priority",
  },
];

export const benefits = [
  {
    icon: Target,
    title: "Curated Excellence",
    desc: "Every product is carefully selected and verified. We partner only with authenticated sellers meeting our strict quality standards.",
    features: [
      "Quality verified",
      "Authenticated sellers",
      "Premium brands only",
    ],
  },
  {
    icon: Zap,
    title: "Lightning-Fast Service",
    desc: "Same-day delivery in major cities. Standard shipping: 5-7 days. Real-time tracking on all orders worldwide.",
    features: [
      "Same-day available",
      "Real-time tracking",
      "Free shipping $50+",
    ],
  },
  {
    icon: Shield,
    title: "Complete Protection",
    desc: "Our ShopHub Guarantee covers everything. 30-day money-back guarantee with zero risk. No questions asked.",
    features: [
      "30-day returns",
      "Money-back guarantee",
      "Free return shipping",
    ],
  },
  {
    icon: Users,
    title: "Expert Guidance",
    desc: "Access to product specialists and customer service representatives available 24/7 in multiple languages.",
    features: ["24/7 support", "Product experts", "Multiple languages"],
  },
  {
    icon: Gift,
    title: "Exclusive Rewards",
    desc: "Earn points on every purchase. Unlock member benefits, early sale access, and special discounts.",
    features: ["Earn points", "VIP access", "Special discounts"],
  },
  {
    icon: Globe,
    title: "Global Selection",
    desc: "Access premium brands and unique products from 120+ countries. Discover items you won't find anywhere else.",
    features: ["120+ countries", "Unique items", "Rare collections"],
  },
];

export const testimonials = [
  {
    name: "Sarah Chen",
    title: "Product Manager",
    company: "Tech Innovations Inc",
    text: "ShopHub's reliability, transparency, and customer service set them apart. They've become our preferred B2B partner.",
    rating: 5,
    verification: "Verified Purchase",
  },
  {
    name: "Marcus Johnson",
    title: "CEO",
    company: "Premium Retail Group",
    text: "Quality products, impeccable service, and competitive pricing. We've increased our order volume by 300% this year.",
    rating: 5,
    verification: "Verified Purchase",
  },
  {
    name: "Elena Rodriguez",
    title: "Supply Chain Director",
    company: "Global Distribution Co",
    text: "Outstanding platform with reliable inventory, real-time tracking, and exceptional support. Highly recommended.",
    rating: 5,
    verification: "Verified Purchase",
  },
];

export const faqs = [
  {
    question: "What is ShopHub's return policy?",
    answer:
      "We offer a full 30-day money-back guarantee on all products. If you're not completely satisfied, simply return your purchase for a full refund, no questions asked. We also offer free return shipping on orders over $50.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 5-7 business days. We also offer express shipping (2-3 days) and same-day delivery in select areas. All shipping is free on orders over $50. You can track your package in real-time.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Yes. We use industry-standard 256-bit SSL encryption for all transactions. Your payment details are never stored on our servers and are processed through PCI-DSS compliant payment processors. We're certified by leading security providers.",
  },
  {
    question: "Can I return items from international sellers?",
    answer:
      "Absolutely. All sellers on ShopHub guarantee the same quality and return standards. International returns may take slightly longer (10-14 days), but you have full protection under our buyer guarantee.",
  },
];

export const companyStats = [
  { label: "Founded", value: "2020" },
  { label: "Countries", value: "120+" },
  { label: "Team Size", value: "500+" },
  { label: "Languages", value: "25+" },
];

export const companyValues = [
  {
    title: "Customer-First Approach",
    desc: "Every decision we make puts customers at the center",
  },
  {
    title: "Radical Transparency",
    desc: "No hidden fees, no surprises—clear pricing always",
  },
  {
    title: "Continuous Innovation",
    desc: "Latest technology for better shopping experience",
  },
  {
    title: "Sustainable Practices",
    desc: "Committed to eco-friendly operations",
  },
];
