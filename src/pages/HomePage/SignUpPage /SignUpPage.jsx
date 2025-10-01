import React from "react";

import { Image } from "antd";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import InputForm from "../../../components/InputForm/InputForm";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import ImageSignIn from "../../../assets/Images/sign-in.png";
const SignUpPage = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.53)",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "800px",
          height: "445px",
          borderRadius: "6px",
          background: "#fff",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <WrapperContainerLeft>
          <h1>Xin Chào</h1>
          <p>Đăng Nhập Vào Tài Khoảng</p>
          <InputForm
            style={{ marginBottom: "10px" }}
            placeholder="abc@gmail.com"
          />
          <InputForm placeholder="password" style={{ marginBottom: "10px" }} />
          <InputForm
            placeholder="comfirm password"
            style={{ marginBottom: "10px" }}
          />
          <ButtonComponent
            size="large"
            styleButton={{
              background: "rgb(255, 57, 69)", // nền đỏ
              height: "48px",
              width: "100%",
              border: "none",
              marginTop: "26px,0 10px",
              borderRadius: "4px",
            }}
            textButton="Đăng Nhập"
            styleTextButton={{
              color: "#fff",
              fontSize: "15px",
              fontWeight: "700",
            }} // chữ trắng
          />

          <p>
            Bạn đã có có tài khoảng ?{" "}
            <WrapperTextLight>Đăng Ký</WrapperTextLight>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image
            src={ImageSignIn}
            preview={false}
            alt="image Sign-in"
            height="203px"
            width="203px"
          />
          <h4>Mua Sắm tại KLShop</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignUpPage;
