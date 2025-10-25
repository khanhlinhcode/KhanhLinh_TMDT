import { StarFilled } from "@ant-design/icons";
import {
  StyleNameProduct,
  WrapperCartStyle,
  WrapperDiscountText,
  WrapperPriceText,
  WrapperReportText,
} from "./style";

const CartComponent = (props) => {
  const {
    countInStock,
    description,
    image,
    name,
    price,
    rating,
    type,
    discount,
    selled,
  } = props;

  return (
    <WrapperCartStyle
      hoverable
      headStyle={{ width: "200px", height: "200px" }}
      style={{ width: "240px" }}
      bodyStyle={{ padding: "10px" }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <StyleNameProduct style={{ fontSize: "18px", fontWeight: "bold" }}>
        {name}
      </StyleNameProduct>
      <WrapperReportText>
        <span style={{ marginRight: "4px", fontSize: "14px" }}>
          <span style={{ fontSize: "14px" }}>{rating} </span>
          <StarFilled style={{ fontSize: "14px", color: "yellow" }} />
        </span>
        <span style={{ fontSize: "14px" }}> | (Đã bán {selled || 1000}+)</span>
      </WrapperReportText>
      <WrapperPriceText style={{ fontSize: "16px", fontWeight: 600 }}>
        {price}
        <WrapperDiscountText>{discount || 5}%</WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCartStyle>
  );
};

export default CartComponent;
