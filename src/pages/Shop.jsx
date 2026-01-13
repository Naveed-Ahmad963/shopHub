import { useEffect } from "react";
import ProductList from "../features/products/ProductList";

const Shop = () => {
  // ✅ Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <ProductList />;
};

export default Shop;
