import { StarFilled } from "@ant-design/icons";
import {
  StyleNameProduct,
  WrapperCartStyle,
  WrapperDiscountText,
  WrapperPriceText,
  WrapperReportText,
} from "./style";

const CartComponent = () => {
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
        Iphone
      </StyleNameProduct>
      <WrapperReportText>
        <span style={{ marginRight: "4px", fontSize: "14px" }}>
          <span style={{ fontSize: "14px" }}>4.96 </span>
          <StarFilled style={{ fontSize: "14px", color: "yellow" }} />
        </span>
        <span style={{ fontSize: "14px" }}> | (Đã bán 1000+)</span>
      </WrapperReportText>
      <WrapperPriceText style={{ fontSize: "16px", fontWeight: 600 }}>
        9.000.000 đ<WrapperDiscountText> -10%</WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCartStyle>
  );
};

export default CartComponent;
