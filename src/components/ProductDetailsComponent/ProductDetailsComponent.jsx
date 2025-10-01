import React from "react";
import { Col, Row, Image } from "antd"; // gom import gọn
import ImageProduct from "../../assets/Images/test.png";
import Imagesmall from "../../assets/Images/Imagesmall.png";
import Imagesmall2 from "../../assets/Images/Imagesmall2.png";
import {
  WrapperAddressProduct,
  WrapperInputNumber,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperQuanlityProduct,
  WrapperStyleColISmall,
  WrapperStyleImageSmall,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
} from "./style";
import { MinusOutlined, PlusOutlined, StarFilled } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
const ProductDetailsComponent = () => {
  const onChange = (value) => {
    console.log("changed", value);
  };

  return (
    <Row style={{ padding: "16px", background: "#fff", borderRadius: "4px" }}>
      <Col
        span={10}
        style={{ borderRight: "1px solid #e5e5e5", paddingRight: "16px" }}
      >
        <Image src={ImageProduct} alt="image prop" preview={false} />
        <Row style={{ paddingTop: "10px", justifyContent: "space-between" }}>
          <WrapperStyleColISmall span={4}>
            <WrapperStyleImageSmall
              src={Imagesmall}
              alt="image small"
              preview={false}
            />
          </WrapperStyleColISmall>
          <WrapperStyleColISmall span={4}>
            <WrapperStyleImageSmall
              src={Imagesmall2}
              alt="image small"
              preview={false}
            />
          </WrapperStyleColISmall>
          <WrapperStyleColISmall span={4}>
            <WrapperStyleImageSmall
              src={Imagesmall}
              alt="image small"
              preview={false}
            />
          </WrapperStyleColISmall>
          <WrapperStyleColISmall span={4}>
            <WrapperStyleImageSmall
              src={Imagesmall2}
              alt="image small"
              preview={false}
            />
          </WrapperStyleColISmall>
          <WrapperStyleColISmall span={4}>
            <WrapperStyleImageSmall
              src={Imagesmall}
              alt="image small"
              preview={false}
            />
          </WrapperStyleColISmall>
          <WrapperStyleColISmall span={4}>
            <WrapperStyleImageSmall
              src={Imagesmall2}
              alt="image small"
              preview={false}
            />
          </WrapperStyleColISmall>
        </Row>
      </Col>
      <Col span={14} style={{ padding: "0 16px" }}>
        <WrapperStyleNameProduct>
          Sách - Thám tử lừng danh Conan - Combo 10 tập từ tập 81 đến 90{" "}
        </WrapperStyleNameProduct>
        <div>
          <StarFilled style={{ fontSize: "14px", color: "yellow" }} />
          <StarFilled style={{ fontSize: "14px", color: "yellow" }} />
          <StarFilled style={{ fontSize: "14px", color: "yellow" }} />
          <WrapperStyleTextSell> | (Đã bán 1000+)</WrapperStyleTextSell>
        </div>
        <WrapperPriceProduct>
          <WrapperPriceTextProduct>200.000đ</WrapperPriceTextProduct>
        </WrapperPriceProduct>
        <WrapperAddressProduct>
          <span>Giao đến</span>
          <span className="address">Q.1, P.Bến Nghé, Hô Chí Minh</span> -
          <span className="change-address">Đổi địa chỉ</span>
        </WrapperAddressProduct>
        <div
          style={{
            margin: "10px 0 20px",
            padding: "10px 0",
            borderTop: "1px solid #e5e5e5",
            borderBottom: "1px solid #e5e5e5",
          }}
        >
          <div style={{ marginBottom: "10px" }}>Số Lượng</div>
          <WrapperQuanlityProduct>
            <button style={{ border: "none", background: "transparent" }}>
              <MinusOutlined style={{ color: "#000", fontSize: "20px" }} />
            </button>
            <WrapperInputNumber
              defaultValue={3}
              onChange={onChange}
              size="small"
            />
            <button style={{ border: "none", background: "transparent" }}>
              <PlusOutlined style={{ color: "#000", fontSize: "20px" }} />
            </button>
          </WrapperQuanlityProduct>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div>
            <ButtonComponent
              size="large"
              styleButton={{
                background: "rgb(255, 57, 69)", // nền đỏ
                height: "48px",
                width: "220px",
                border: "none",
                borderRadius: "4px",
              }}
              textButton="Chọn mua"
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }} // chữ trắng
            />
            <ButtonComponent
              size="large"
              styleButton={{
                background: "#fff", // nền đỏ
                height: "48px",
                width: "220px",
                border: " 1px solid rgb(13,92,182)",
                borderRadius: "4px",
              }}
              styleTextButton={{ color: "rgb(13,92,182)", fontSize: "15px" }} // chữ trắng
              textButton="Mua Trả Sau"
            />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ProductDetailsComponent;
   