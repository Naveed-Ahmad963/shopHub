import { Heart, Package, Users, Award, TrendingUp } from "lucide-react";

export const STATS_DATA = [
  {
    id: "customers",
    icon: Users,
    value: "10,000+",
    label: "Happy Customers",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "products",
    icon: Package,
    value: "50,000+",
    label: "Products Sold",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "satisfaction",
    icon: Award,
    value: "99%",
    label: "Satisfaction Rate",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    id: "support",
    icon: TrendingUp,
    value: "24/7",
    label: "Customer Support",
    gradient: "from-purple-500 to-pink-500",
  },
];

export const VALUES_DATA = [
  {
    id: "customer-first",
    icon: Heart,
    title: "Customer First",
    description:
      "Everything we do starts with you. Your satisfaction is our top priority.",
    gradient: "from-red-500 to-pink-500",
  },
  {
    id: "quality",
    icon: Award,
    title: "Quality Guaranteed",
    description:
      "We stand behind every product we sell with our quality guarantee.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "improvement",
    icon: TrendingUp,
    title: "Always Improving",
    description:
      "We are constantly evolving to serve you better every single day.",
    gradient: "from-blue-500 to-cyan-500",
  },
];

export const STORY_PARAGRAPHS = [
  "ShopHub was founded with a simple mission: to make online shopping easy, affordable, and enjoyable for everyone. What started as a small idea has grown into a thriving marketplace serving thousands of customers worldwide.",
  "We believe in quality, transparency, and customer satisfaction above all else. Every product we offer is carefully selected to meet our high standards, and every interaction is an opportunity to exceed your expectations.",
  "Today, we are proud to be a trusted name in ecommerce, and we are just getting started. Thank you for being part of our journey.",
];
