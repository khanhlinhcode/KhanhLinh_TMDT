import { Image } from "antd";
import Slider from "react-slick";

const SliderComponent = ({ arrImages }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <Slider {...settings}>
      {arrImages.map((item, index) => {
        return (
          <div
            key={index}
            style={{
              padding: "0 4px",
              boxSizing: "border-box",
            }}
          >
            <Image 
              key={index}
              src={item}
              alt="slide image"
              preview={false}
              width="100%"
              height="350px"
              style={{
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>
        );
      })}
    </Slider>
  );
};

export default SliderComponent;
