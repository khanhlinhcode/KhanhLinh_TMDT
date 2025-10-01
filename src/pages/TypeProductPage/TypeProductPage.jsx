import React, { Fragment } from "react";
import NavBarComponent from "../../components/NavbarComponent/NavBarComponent";
import CartComponent from "../../components/CartComponent/CartComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";

const TypeProductPage = () => {
  const onChange = (page) => {
    console.log(page);
  };
  return (
    <div style={{ padding: "0 120px", background: "#efefef" }}>
      <Row
        style={{
          flexWrap: "nowrap",
          paddingTop: "10px",
        }}
      >
        <WrapperNavbar span={4}>
          <NavBarComponent />
        </WrapperNavbar>
        <Col span={20}>
          <WrapperProducts span={20}>
            <CartComponent />
            <CartComponent />
            <CartComponent />
            <CartComponent />
            <CartComponent />
            <CartComponent />
            <CartComponent />
          </WrapperProducts>
          <Pagination
            defaultCurrent={2}
            total={100}
            onChange={onChange}
            style={{ textAlign: "center", margin: "10px 0" }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default TypeProductPage;
