import React from "react";
import ProductDetailsComponent from "../../../components/ProductDetailsComponent/ProductDetailsComponent";

const ProductDetailPage = () => {
  return (
    <div
      style={{ padding: "0 120px", background: "#efefef", height: "1000px" }}
    >
      <h5>trang chu</h5>
      <div style={{ display: "flex", background: "#fff" }}>
        <ProductDetailsComponent />
      </div>
    </div>
  );
};

export default ProductDetailPage;
