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


const HomePage = () => {
  const arr = ["TV", "Mobile", "Laptop", "Tablet", "Watch", "Camera"];
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
            <CartComponent />
            <CartComponent />
            <CartComponent />
            <CartComponent />
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
