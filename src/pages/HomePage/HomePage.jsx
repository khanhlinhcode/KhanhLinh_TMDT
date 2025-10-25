import {
  WrapperButtonMore,
  WrapperProducts,
  WrapperTypeProduct,
} from "./style";
import slide1 from "../../assets/Images/slide1.png";
import slide2 from "../../assets/Images/slide2.png";
import slide3 from "../../assets/Images/slide3.png";

import TypeProduct from "../../components/TypeProduct/TypeProduct";
import CartComponent from "../../components/CartComponent/CartComponent";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";

const HomePage = () => {
  const arr = ["TV", "Mobile", "Laptop", "Tablet", "Watch", "Camera"];
  const fetchProductAll = async () => {
    const res = await ProductService.getAllProduct();
    console.log("res", res);
    return res;
  };
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
  });
  console.log("data", products);
  return (
    <>
      <div style={{ padding: "0 120px" }}>
        <WrapperTypeProduct>
          {arr.map((item) => (
            <TypeProduct name={item} key={item} />
          ))}
        </WrapperTypeProduct>
        <div
          id="container"
          style={{
            backgroundColor: "#efefef",
            height: "1000px",
            width: "100%",
          }}
        >
          <SliderComponent arrImages={[slide1, slide2, slide3]} />
          <WrapperProducts>
            {products?.data?.map((product) => {
              return (
                <CartComponent
                  key={product._id}
                  countInStock={product.countInStock}
                  description={product.description}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  rating={product.rating}
                  type={product.type}
                  selled={product.selled}
                  discount={product.discount}
                />
              );
            })}
          </WrapperProducts>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <WrapperButtonMore
              textButton="Xem Thêm"
              type="outline"
              styleButton={{
                border: "1px solid rgb(13, 92, 182)",
                color: "rgb(13, 92, 182)",
                marginTop: "20px",
                width: "240px",
                height: "38px",
                fontSize: "16px",
                borderRadius: "4px",
              }}
              styleTextButton={{ fontWeight: 500 }}
            />
          </div>
          {/* <NavBarComponent /> */}
        </div>
        <TypeProduct />
      </div>
    </>
  );
};

export default HomePage;
