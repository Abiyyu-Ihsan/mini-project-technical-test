import ProductView from "@components/screens/product";
import ProductPageMobile from "@components/screens/product/product-mobile";
import React, { useState, useEffect } from "react";

const ProductPage: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <ProductPageMobile /> : <ProductView />;
};

export default ProductPage;
