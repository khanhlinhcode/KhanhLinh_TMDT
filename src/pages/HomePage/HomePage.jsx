import { WrapperTypeProduct } from "./style";
import slide1 from "../../assets/Images/slide1.png";
import slide2 from "../../assets/Images/slide2.png";
import slide3 from "../../assets/Images/slide3.png";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import CartComponent from "../../components/CartComponent/CartComponent";
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
          style={{ backgroundColor: "#efefef", height: "1000px" }}
        >
          <SliderComponent arrImages={[slide1, slide2, slide3]} />
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              gap: "20px",
            }}
          >
            <CartComponent />
          </div>
        </div>
        <TypeProduct />
      </div>
    </>
  );
};

export default HomePage;
